const express = require('express');
const router = express.Router();
const controller = require('../controllers/pantryControllers.js');
const {login} = require('../auth/auth');
const {verify} = require('../auth/auth');

router.post('/login', login, controller.handle_login);
// Routers for pages
router.get('/', controller.home);
router.get('/about', controller.about);
router.get('/new', verify, controller.new_entry);
router.get('/contact', controller.contact);
router.get('/new_entry', verify, controller.new_entry);
router.get('/login', controller.show_login_page);
router.get("/logout", verify, controller.logout);
router.get('/foodFinder', controller.entries_list);
router.get('/register', controller.show_register_page);
router.get("/loggedIn", verify, controller.loggedIn_entries);

router.post('/new', controller.post_new_entry);
router.post('/register', controller.post_new_user);


// Router for page not found
router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not Found');
})

// Router for internal server error
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})
module.exports = router;