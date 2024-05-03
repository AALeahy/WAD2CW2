const bcrypt = require('bcrypt')
const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken");

// Sets up login function
exports.login = function (req, res, next) {

    let username = req.body.username;
    let password = req.body.password;

    // Checks if user exists
    userModel.lookup(username, function(err, user) {
        if (err) {
            console.log("Error looking up user.", err);
            return res.status(401).send();
        } 
        if (!user) {
            console.log("User: ", username, " not found.");
            return res.render(user/register);
        }
        
        // Compares passwords
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let payload = { username: user.username};
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
                res.cookie("jwt", accessToken);
                next();
            } else {
                return res.render("user/login");
            }
        });
    });
};

exports.verify = function (req, res, next) {
    let accessToken = req.cookies.jwt;
    
    if (!accessToken) {
        return res.status(403).send();
    }

    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (e) {
        res.status(401).send();
    }
}