
"use strict"
var User = require('../models/user');
var jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.status(400).send("Name is required");
        }
        if (!password || password.length < 6) {
            return res.status(400).send("Password is required and should be min 6 characters long");
        }
        let userExist = await User.findOne({ email }).exec();
        if (userExist) {
            return res.status(400).send("Email is taken");
        }
        const user = new User(req.body);
        await user.save();
        console.log("USER CREATED", user);
        return res.json({ ok: true });
    } catch (err) {
        console.log("Create User Failed", err);
        return res.status(400).send("Error, try again.");
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email }).exec()
        if (!user) {
            res.status(400).send("User with that email not found");
        }
        user.comparePassword(password, (err, match) => {
            if (!match || err) {
                return res.status(400).send("Wrong password");
            }
            let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            res.json({
                token, user: { _id: user._id, name: user.name, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt },
            });
        });
    } catch (err) {
        console.log("LOGIN ERROR", err);
        res.status(400).send("Signin failed");
    }
};
exports.register = register, exports.login = login;