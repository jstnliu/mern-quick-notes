const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

// Always require and configure near the top 
require('dotenv').config();
// Connect to the database
require('./config/database');

// Require the Mongoose models
// const User = require('./models/user');
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');

// Local variables will come in handy for holding retrieved documents
let user, item, category, order;
let users, items, categories, orders;

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'public' folder
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./config/checkToken'))

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/users/login', require('./routes/api/users'))

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

 // Configure to use port 3001 instead of 3000 during
 // development to avoid collision with React's dev server
 const port = process.env.PORT || 3001;
	
 app.listen(port, function() {
   console.log(`Express app running on port ${port}`)
 });