import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AppContext } from './AppProvider';



const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin-top: 20px;
`;

const FormInput = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormButton = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #9F3434;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7f2828;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AppContext);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setUsername('');
    setPassword('');
    setEmail('');
    setName('');
    setAddress('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
try {
      const response = await axios.post('https://veomcourse.com:5000/api/login', {
        username,
        password,
      });
console.log(response.data)
      localStorage.setItem('userID', response.data.apiResponse.id);

 if (response.data.apiResponse.message === 'Valid credentials') {
console.log(response.data.apiResponse.message)
        const basicAuthString = btoa(`${username}:${password}`);
        localStorage.setItem('basicAuth', basicAuthString);

        localStorage.setItem('userID', response.data.apiResponse.id); // Store user ID in localStorage
 // Set the user object with the id
window.location.href = 'https://veomcourse.com/dashboard';
      } else {
        setError('Invalid username or password');
      }
      console.log('Login successful', response.data);
      setError('Login successful');
      // Redirect to dashboard upon successful login
      window.location.href = 'https://veomcourse.com/dashboard';
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password');
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

try{
      const response = await axios.post('https://veomcourse.com:5000/api/signup', {
        username,
        password,
        email,
        name,
        address,
      });
      console.log('Signup successful', response.data);
      setError('User created successfully');
      setUsername('');
      setPassword('');
      setEmail('');
      setName('');
      setAddress('');
    } catch (error) {
      console.error('There was an error creating the user!', error);
      setError('Error creating user');
    }
  
};
  return (
    <StyledLogin>
      <FormContainer>
        {isLogin ? (
          <LoginForm onSubmit={handleLogin}>
            <h2>Login</h2>
            <FormInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FormInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <FormButton type="submit">Login</FormButton>
            <FormButton type="button" onClick={toggleForm}>
              Don't have an account? Sign Up
            </FormButton>
          </LoginForm>
        ) : (
          <LoginForm onSubmit={handleSignup}>
            <h2>Sign Up</h2>
            <FormInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FormInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FormInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormInput
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FormInput
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <FormButton type="submit">Sign Up</FormButton>
            <FormButton type="button" onClick={toggleForm}>
              Already have an account? Login
            </FormButton>
          </LoginForm>
        )}
      </FormContainer>
    </StyledLogin>
  );
}

