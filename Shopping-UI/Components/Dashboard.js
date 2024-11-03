import React, { useContext,useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import Modal from 'react-modal';


const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-color: #fff8e1;
  padding: 20px;
  overflow-y: auto;
`;
const OrderHistoryButton = styled.button`
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #ffc72c;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #e0a800;
  }
`;
const Label = styled.label`
  padding-right: 10px;
  text-align: right;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
const Header = styled.header`
  width: 100%;
  background-color: #ffc72c;
  padding: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #000;
  position: relative;
`;

const IconsWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 100px;
  display: flex;
  align-items: center;

`;

const CartIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CartCount = styled.span`
  background-color: #ff5733;
  color: #fff;
  border-radius: 50%;
  padding: 0 8px;
  margin-left: 5px;
`;

const PromoBanner = styled.div`
  width: 100%;
  background-color: #ff5733;
  padding: 15px;
  color: #fff;
  text-align: center;
  margin: 20px 0;
  border-radius: 10px;
`;

const ContentSection = styled.section`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.h2`
  font-size: 20px;
  color: #000;
  margin-bottom: 10px;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const OfferItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  background-color: ${props => props.selected ? '#ffeeba' : 'transparent'};
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  align-items: center;
`;

const OrderButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #ffc72c;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #e0a800;
  }
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #ffc72c;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #e0a800;
  }
`;

const FetchButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #ffc72c;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #e0a800;
  }
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #d9534f;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
  &:hover {
    background-color: #c9302c;
  }
`;
const ApplyButton = styled.button`
  padding: 10px 20px;
  background-color: #ffc72c;
  border: none;
  border-radius: 5px;
  color: #000;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #e0a800;
  }
`;



const CountButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin: 0 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const AddToCartButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #ffc72c;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #e0a800;
  }
`;
const PopUpMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
`;
export function Dashboard() {
  const [cart, setCart] = useState([]);

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [profile, setProfile] = useState({ id: '', name: '', email: '', address: '' });
  const [profileForm, setProfileForm] = useState({ id: userID, name: '', email: '', address: '', username: '', password: '' });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tempCart, setTempCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [orderID, setOrderID] = useState('');
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const basicAuth = localStorage.getItem('basicAuth');
  const userID = localStorage.getItem('userID');
  useEffect(() => {
    fetchMenuItems();

  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('https://veomcourse.com:5000/api/menu-items', {
          headers: {
            'Authorization': `Basic ${basicAuth}`,
          },
        });
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`https://veomcourse.com:5000/api/users/profile/${userID}`, {
          headers: {
            'Authorization': `Basic ${basicAuth}`,
          },
        });
      setProfile(response.data);
      setProfileForm(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

const offers = [
    { name: 'Buy 1 Get 1 Free on Big Mac', type: 'bogo', item: 'Big Mac' },
    { name: '20% off on orders over $20', type: 'discount', discount: 0.2 },
    { name: 'Free Fries with any purchase', type: 'free', item: 'Fries' },
  ];

  const handleAddToTempCart = (item) => {
    const existingItemIndex = tempCart.findIndex(cartItem => cartItem.name === item.name);
    if (existingItemIndex > -1) {
      const newTempCart = [...tempCart];
      newTempCart[existingItemIndex].count += 1;
      setTempCart(newTempCart);
    } else {

      setTempCart([...tempCart, { ...item, count: 1 }]);
    }
  };

  const handleRemoveFromTempCart = (index) => {
    const newTempCart = [...tempCart];
    if (newTempCart[index].count > 1) {
      newTempCart[index].count -= 1;
    } else {
      newTempCart.splice(index, 1);
    }
    setTempCart(newTempCart);
  };

  const handleMenuIncrement = (item) => {
    handleAddToTempCart(item);
  };

  const handleMenuDecrement = (item) => {
    const existingItemIndex = tempCart.findIndex(cartItem => cartItem.name === item.name);
    if (existingItemIndex > -1) {
      handleRemoveFromTempCart(existingItemIndex);
    }
  };

  const handleSelectOffer = (offer) => {
    setSelectedOffer(selectedOffer && selectedOffer.name === offer.name ? null : offer);
  };

  const handleApplyOffer = () => {
    if (selectedOffer) {
      alert(`Offer "${selectedOffer.name}" applied!`);
    }
  };

const handleOrderNow = async (e) => {
e.preventDefault();
    const order = {
 items: cart,
      userId: userID,
      
      total: Number(getTotalPrice()),
        // Ensure userId is the ID of the user placing the order
    };

    try {
      const response = await axios.post('https://veomcourse.com:5000/api/orders', order, {
          headers: {
            'Authorization': `Basic ${basicAuth}`,
          },
        });
      console.log('Order placed:', response.data);
      //setOrderHistory([...orderHistory, response.data]);
      setPopUpMessage('Your order has been placed. Order ID:' + response.data.apiResponse.orderID);
      setTimeout(() => setPopUpMessage(''), 5000); // Hide after 5 seconds

console.log('test')
      setCart([]);
      setIsCartOpen(false);
    } catch (error) {
  if (error.response && error.response.data && error.response.data.message) {
          // Find the item that caused the error
          alert(`Not enough stock for the items you selected`);
        }
else{
      console.error('Error placing order:', error);
}
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://veomcourse.com:5000/api/users/profile/${userID}`, profileForm, {
          headers: {
            'Authorization': `Basic ${basicAuth}`,
          },
        });
      console.log('Profile updated:', response.data);
      setProfile(profileForm);
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

//const fetchOrderHistory = async () => {
  //  try {
    //  const response = await axios.get('https://veomcourse.com:5000/api/orders');
    //  setOrderHistory(response.data);
     // setIsOrderHistoryOpen(true);
   // } catch (error) {
    //  console.error('Error fetching order history:', error);
   // }
 // };
  const handleLogout = () => {
    localStorage.removeItem('userId');

    window.location.href = 'https://veomcourse.com/login';
  };



  const getTotalPrice = () => {
    let total = cart.reduce((total, item) => total + Number(item.price) * item.count, 0);
    if (selectedOffer) {
      switch (selectedOffer.type) {
        case 'bogo':
          const bogoItemCount = cart.filter(item => item.name === selectedOffer.item).reduce((count, item) => count + item.count, 0);
          const freeItems = Math.floor(bogoItemCount / 2);
          total -= freeItems * menuItems.find(item => item.name === selectedOffer.item).price;
          break;
        case 'discount':
          if (total > 20) {
            total -= total * selectedOffer.discount;
          }
          break;
        case 'free':
          if (cart.length > 0) {
            const freeItem = menuItems.find(item => item.name === selectedOffer.item);
            total -= freeItem.cost;
          }
          break;
        default:
          break;
      }
    }
    return total;
  };

  const getMenuItemCount = (itemName) => {
    const item = tempCart.find(cartItem => cartItem.name === itemName);
    return item ? item.count : 0;
  };

  const getTotalItemCount = () => {
    return cart.reduce((total, item) => total + item.count, 0);
  };

  const toggleCartModal = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleProfileModal = () => {
    setIsProfileOpen(!isProfileOpen);
if (!isProfileOpen) {
      fetchProfile(); // Fetch user profile data when opening the modal
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = () => {
    const newCart = [...cart];
    tempCart.forEach(tempItem => {
        const existingItemIndex = newCart.findIndex(cartItem => cartItem.name === tempItem.name);
      if (existingItemIndex > -1) {
        newCart[existingItemIndex].count += tempItem.count;
      } else {
        newCart.push(tempItem);

      }
    });
    setCart(newCart);
    setTempCart([]);
  };
const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`https://veomcourse.com:5000/api/orders/user/${userID}`, {
          headers: {
            'Authorization': `Basic ${basicAuth}`,
          },
        });
      setOrderHistory(response.data);
      setIsOrderHistoryOpen(true);

    } catch (error) {
      console.error('Error fetching order history by user ID:', error);
    }
  };
  const handleDecrement = (index) => {
    const newCart = [...cart];
    if (newCart[index].count > 1) {
      newCart[index].count -= 1;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };
const toggleOrderHistoryModal = () => {
    setIsOrderHistoryOpen(!isOrderHistoryOpen);
  };
  const handleIncrement = (index) => {
    const newCart = [...cart];
    newCart[index].count += 1;
    setCart(newCart);
  };

  return (
    <StyledDashboard>
      <Header>
        McDonald's
        <IconsWrapper>
        <UserIcon onClick={toggleProfileModal}>
          <FaUser size={24} />
        </UserIcon>
</IconsWrapper>
{userID && (
  <div style={{ 
    position: 'absolute', 
    top: '5px', 
    left: '70%', 
    transform: 'translateX(-50%)', 
    backgroundColor: '#ffc72c', 
    padding: '5px 10px', 
    borderRadius: '5px', 
    color: '#000', 
    fontWeight: 'bold' 
  }}>
    ID#: {userID}
  </div>
)}
        <CartIcon onClick={toggleCartModal}>
          <FaShoppingCart size={24} />
          <CartCount>{getTotalItemCount()}</CartCount>
        </CartIcon>
    
      </Header>
      {popUpMessage && <PopUpMessage>{popUpMessage}</PopUpMessage>}

      <PromoBanner>
        <h2>Exclusive Offers!</h2>
        <p>Get 20% off on your first order</p>
      </PromoBanner>
      <ContentSection>
        <SectionHeader>Menu</SectionHeader>
        <SearchInput
          type="text"
          placeholder="Search for a menu item"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {filteredMenuItems.map((item, index) => (
          <MenuItem key={index}>
            <span>{item.name}</span>
            <span>{item.stock} Stock</span>
            <span>${Number(item.price).toFixed(2)}</span>
            <span>
              <CountButton onClick={() => handleMenuDecrement(item)}>-</CountButton>
              Count: {getMenuItemCount(item.name)}
              <CountButton onClick={() => handleMenuIncrement(item)}>+</CountButton>
            </span>
          </MenuItem>
        ))}
        <AddToCartButton onClick={handleAddToCart}>Add To Cart</AddToCartButton>
      </ContentSection>
      <ContentSection>
        <SectionHeader>Offers</SectionHeader>
        {offers.map((offer, index) => (
          <OfferItem 
            key={index} 
            selected={selectedOffer && selectedOffer.name === offer.name}
            onClick={() => handleSelectOffer(offer)}
          >
            <span>{offer.name}</span>
          </OfferItem>
        ))}
        <button onClick={handleApplyOffer}>
          {selectedOffer ? 'Apply Offer' : 'Select an Offer'}
        </button>
      </ContentSection>
      <ContentSection>
        <SectionHeader>Profile</SectionHeader>
        <div>
          <h3>Saved Information</h3>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Username:</strong> {profile.username}</p>
        </div>
      </ContentSection>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <OrderHistoryButton onClick={fetchOrderHistory}>Show Order History</OrderHistoryButton>

      <Modal
        isOpen={isCartOpen}
        onRequestClose={toggleCartModal}
        contentLabel="Cart Modal"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <ModalContent>
          <h2>Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <CartItem key={index}>
                  <span>{item.name} x {item.count}</span>
                  <span>${(Number(item.price) * item.count).toFixed(2)}</span>
                  <CountButton onClick={() => handleDecrement(index)}>-</CountButton>
                  <CountButton onClick={() => handleIncrement(index)}>+</CountButton>
                  <button onClick={() => handleDecrement(index)}>Remove</button>
                </CartItem>
              ))}
              <CartItem>
                <strong>Total</strong>
                <strong>${getTotalPrice().toFixed(2)}</strong>
              </CartItem>
              <OrderButton onClick={handleOrderNow}>Order Now</OrderButton>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isProfileOpen}
        onRequestClose={toggleProfileModal}
        contentLabel="Profile Modal"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <ModalContent>
<h2>Update Profile</h2>
          <ProfileForm onSubmit={handleSaveProfile}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <InputField
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={profileForm.name}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <InputField
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={profileForm.email}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="address">Address</Label>
              <InputField
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                value={profileForm.address}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <InputField
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={profileForm.username}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <InputField
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={profileForm.password}
                onChange={handleInputChange}
              />
            </FormGroup>
            <SaveButton type="submit">Save</SaveButton>
          </ProfileForm>
        </ModalContent>
      </Modal>
<Modal
        isOpen={isOrderHistoryOpen}
        onRequestClose={toggleOrderHistoryModal}
        contentLabel="Order History Modal"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <ModalContent>
          <h2>Order History</h2>
          {orderHistory.length === 0 ? (
            <p>No past orders.</p>
          ) : (
            orderHistory.map((order, index) => (
              <div key={index}>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Total:</strong> ${order.total}</p>
                <p><strong>Items:</strong> {order.items.map(item => `${item.name} x ${item.count}`).join(', ')}</p>
                <hr />
              </div>
            ))
          )}
        </ModalContent>
      </Modal>
    </StyledDashboard>
  );
}
