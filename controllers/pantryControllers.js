// Imports and creates instance of Pantry class
const pantryDAO = require('../models/pantryModel');
const db = new pantryDAO();

// Imports user model
const userDao = require('../models/userModel.js');

db.init();

// Controller exports for each page
exports.entries_list = function(req, res) {
    db.getAllEntries().then((list) => {
        res.render("entries", {
            'entries': list
        });
        console.log('promise resolved')
    })
    .catch((err) => {
        console.log('promise rejected'. err);
    })
}

exports.home = function(req, res) {
    res.redirect('home.html')
}
exports.contact = function(req, res) {
    res.redirect('contact.html')
}
exports.about = function(req, res) {
    res.redirect('about.html')
}
exports.new_entry = function(req, res) {
    res.render('newEntry', {
        'user': 'user'
    })
}

exports.post_new_entry = function(req, res) {
    console.log('processing post_new_entry controller');
    if (!req.body.expiry) {
        response.status(400).send("Entries must have an expiry date.");
        return;
    }
    if (!req.body.name) {
        response.status(400).send("Entries must have a name.")
        return;
    }
    db.addEntry(req.body.name, req.body.quantity, req.body.expiry, req.body.owner, req.body.description )
    res.redirect('/loggedIn');
}

exports.show_register_page = function(req, res) {
    res.render("user/register");
}

exports.post_new_user = function(req, res) {
    const user = req.body.username;
    const password = req.body.pass;

    if (!user || !password) {
        res.send(401, 'No username or no password detected.');
        return;
    }
    userDao.lookup(user, function(err, u) {
        if (u) {
            res.send(401, "User found:", user);
            return;
        }
        userDao.create(user, password);
        console.log("Register user", user, "Password", password);
        res.redirect('/login');
    });
}

exports.show_login_page = function(req, res) {
    res.render("user/login");
}

exports.loggedIn_entries = function (req, res) {
    db.getAllEntries().then((list) => {
        res.render("entries", {
            entries: list,
            user: "user"
        });
        console.log("promise resolved");
    })
    .catch((err) => {
        console.log("promise rejected", err);
    });
}

exports.handle_login = function (req, res) {
    res.render("newEntry", {
        user: "user"
    })
}

exports.logout = function (req, res) {
    res.clearCookie("jwt").status(200).redirect("/");
}
