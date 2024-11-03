const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const basicAuth = require('express-basic-auth');



const app = express();
const port = 5000;

// Path to the SSL certificate and key files
const keyPath = path.join('/etc/letsencrypt/live/veomcourse.com', 'privkey.pem');
const certPath = path.join('/etc/letsencrypt/live/veomcourse.com', 'cert.pem');
// Read the SSL certificate and key
const privateKey = fs.readFileSync(keyPath, 'utf8');
const certificate = fs.readFileSync(certPath, 'utf8');

const credentials = { key: privateKey, cert: certificate};

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());
const authMiddleware = basicAuth({
    authorizer: async (username, password, cb) => {
        try {
            const response = await axios.post('http://veomcourse.com:1200/users/validate', {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.message === 'Valid credentials') {
                return cb(null, true);
            } else {
                return cb(null, false);
            }
        } catch (error) {
            console.error('Error validating user:', error);
            return cb(null, false);
        }
    },
    authorizeAsync: true,
    unauthorizedResponse: (req) => 'Unauthorized'
});
// HTTPS Agent with SSL configuration
const httpsAgent = new https.Agent({
  cert: certificate,
  key: privateKey,
});


// Define a POST route
app.post('/api/login', async (req, res) => {
  const receivedData = req.body;
  console.log('Received data:', receivedData);

  // Configure axios to use the SSL certificate

  try {
    // Make a POST request to another API using the configured httpsAgent
    const apiResponse = await axios.post('http://veomcourse.com:1200/users/validate', receivedData, {
      headers: {
        'Content-Type': 'application/json'
      },
httpsAgent
    });
    // Respond with the data from the external API
    res.json({ message: 'Data received and forwarded successfully', apiResponse: apiResponse.data });
  } catch (error) {
    console.error('Error forwarding data to external API:', error);
    res.status(500).json({ message: 'Error forwarding data to external API', error: error.message });
  }
});



// Define a POST route
app.post('/api/signup', async (req, res) => {
  const receivedData = req.body;
  console.log('Received data:', receivedData);

  // Configure axios to use the SSL certificate

  try {
    // Make a POST request to another API using the configured httpsAgent
    const apiResponse = await axios.post('http://veomcourse.com:1200/api/users', receivedData, {
      headers: {
        'Content-Type': 'application/json'
      }
     
    });

    // Respond with the data from the external API
    res.json({ message: 'Data received and forwarded successfully', apiResponse: apiResponse.data });
  } catch (error) {
    console.error('Error forwarding data to external API:', error);
    res.status(500).json({ message: 'Error forwarding data to external API', error: error.message });
  }
});
// Define a GET route to fetch menu items
app.get('/api/menu-items',authMiddleware,async (req, res) => {
const authHeader = req.headers.authorization;
  try {
    // Make a GET request to the Golang API to fetch menu items
    const apiResponse = await axios.get('http://veomcourse.com:1202/api/menu-items', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
    });

    // Respond with the data from the external API
    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching menu items from external API:', error);
    res.status(500).json({ message: 'Error fetching menu items from external API', error: error.message });
  }
});
// Define a POST route to add menu items
app.post('/api/menu-items',authMiddleware, async (req, res) => {
const authHeader = req.headers.authorization;
  try {
    // Make a POST request to the Golang API to add a menu item
    const apiResponse = await axios.post('http://veomcourse.com:1202/api/menu-items', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
    });

    // Respond with the data from the external API
    res.status(apiResponse.status).json(apiResponse.data);
  } catch (error) {
    console.error('Error adding menu item to external API:', error);
    res.status(500).json({ message: 'Error adding menu item to external API', error: error.message });
  }
});

app.put('/api/users/profile/:id',authMiddleware, async (req, res) => {
  const profileData = req.body;
  const { id } = req.params;
  console.log('Received profile data:', profileData);
    const authHeader = req.headers.authorization;

  try {
    // Forward the request to the GoLang API
    const apiResponse = await axios.put(`http://veomcourse.com:1200/api/users/profile/${id}`, profileData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      }
    });

    res.json({ message: 'Profile updated successfully', apiResponse: apiResponse.data });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Endpoint to fetch profile
app.get('/api/users/profile/:id',authMiddleware, async (req, res) => {
  const { id } = req.params;
  console.log('Fetching profile for ID:', id);
const authHeader = req.headers.authorization;
  try {
    // Forward the request to the GoLang API
    const apiResponse = await axios.get(`http://veomcourse.com:1200/api/users/profile/${id}`, {
      headers: {
        'Content-Type': 'application/json',
         'Authorization': authHeader
      }
    });

    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Define a POST route for order submission
app.post('/api/orders', authMiddleware, async (req, res) => {
  const receivedData = req.body;
  console.log('Received order data:', receivedData);
const authHeader = req.headers.authorization;
  try {
    const apiResponse = await axios.post('http://veomcourse.com:1201/api/orders', receivedData, {
      headers: {
        'Content-Type': 'application/json',
         'Authorization': authHeader
      }
    });

    res.json({ message: 'Order received and forwarded successfully', apiResponse: apiResponse.data });
  } catch (error) {
    console.error('Error forwarding order data to external API:', error);
    res.status(500).json({ message: 'Error forwarding order data to external API', error: error.message });
  }
});
app.get('/api/orders',authMiddleware, async (req, res) => {
const authHeader = req.headers.authorization;
  try {
    const response = await axios.get('http://veomcourse.com:1201/api/orders', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching orders:', error);
res.status(500).json({ message: 'Error forwarding order data to external API', error: error.message });
  }
});
app.get('/api/orders/user/:userID',authMiddleware, async (req, res) => {
  const { userID } = req.params;
  console.log('Fetching orders for userID:', userID);
const authHeader = req.headers.authorization;
  try {
    const apiResponse = await axios.get(`http://veomcourse.com:1201/api/orders/user/${userID}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
    });
    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching orders by userID:', error);
    res.status(500).json({ message: 'Error fetching orders by userID', error: error.message });
  }
});


// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start the HTTPS server
httpsServer.listen(port, () => {
  console.log(`HTTPS Server is running on https://localhost:${port}`);
});

