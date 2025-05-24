const http = require('http');
const mongoose = require('mongoose');

const options = {
  host: 'localhost',
  port: process.env.PORT || 5000,
  path: '/api/v1/health',
  timeout: 2000,
};

const request = http.request(options, (res) => {
  if (res.statusCode === 200) {
    // Check MongoDB connection
    mongoose.connection.db.admin().ping((err) => {
      if (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
      }
      console.log('MongoDB connection successful');
      process.exit(0);
    });
  } else {
    console.error(`Status: ${res.statusCode}`);
    process.exit(1);
  }
});

request.on('error', (err) => {
  console.error('Health check failed:', err);
  process.exit(1);
});

request.end();
