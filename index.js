const express = require('express');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

// Configure CORS (Replace 'your-app-domain' with your app's domain)
app.use(cors({ origin: 'https://magezi.ac.ug' }));


// Configure security headers with Helmet
app.use(helmet());

// Configure logging with Morgan (optional)
app.use(morgan('dev'));

// Define the target API URL
const targetUrl = 'https://magezi.ac.ug/mobile_app_end_points/login.php';

// Create a proxy middleware for the target API
const apiProxy = proxy({ target: targetUrl, changeOrigin: true });

// Vercel expects the application to be served at the root path (/)
app.use('/', apiProxy); // All requests go through the proxy

app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`); // Optional for local testing
});
