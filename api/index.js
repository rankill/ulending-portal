const express = require('express');
const consola = require('consola');


// Create express instance
const app = express()

// Require API routes
const lendings = require('./routes/lendings')

app.use(express.static('static'));

// Import API Routes
app.use(lendings)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
