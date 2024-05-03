// Sets up dependencies
const express = require('express');
const app = express();
require('dotenv').config();

const path = require('path');

const public = path.join(__dirname, 'public');
app.use(express.static(public));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');



const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Connects to controller
const router = require('./routes/pantryRoutes');
app.use('/', router);



// Sets up server on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000, Ctrl + C to quit.');
})