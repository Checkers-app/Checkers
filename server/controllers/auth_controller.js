const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
require("dotenv").config();
const { GMAIL_ACCOUNT, GMAIL_PASS } = process.env;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${GMAIL_ACCOUNT}`,
        pass: `${GMAIL_PASS}`
    }
});


module.exports = {

    create: async (req, res) => {
        let { username, password, email } = req.body;

        const emailRegex = /@.*\./;
        if (!emailRegex.test(email)) {
            return res.status(409).send('That doesnt look like a valid email bro');
        }

        const db = req.app.get("db");
        let result = await db.auth.read_user([email]);
        let existingUser = result[0];
        if (existingUser) {
            return res.status(409).send('email is already registered');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registeredUser = await db.auth.create_user(username, email, hash);
        const user = registeredUser[0];
        req.session.user = { username: user.username, uid: user.user_id, wins: user.wins, losses: user.losses, about: user.about }


        var mailOptions = {
            from: `${GMAIL_ACCOUNT}`,
            to: `${email}`,
            subject: 'Thank you for signing up with the Checkers app',
            text: 'This email address has just been registered with our Checkers app'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(201).send(req.session.user);

    },

    login: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get("db");
        const foundUser = await db.auth.read_user([username]);
        const user = foundUser[0];
        if (!user) {
            return res.status(401).send('User not found');
        }
        const isAuthenticated = bcrypt.compareSync(password, user.hash);
        if (!isAuthenticated) {
            return res.status(401).send('wrong password bro');
        }
        req.session.user = { username: user.username, uid: user.user_id, wins: user.wins, losses: user.losses, about: user.about }
        return res.status(201).send(req.session.user);
    },

    logout: async (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    },

    updateUsername: async (req, res) => {
        const { username, uid } = req.body;
        const db = req.app.get("db");
        let result = await db.auth.update_username([username, uid]);
        let user = result[0];
        req.session.user = { username: user.username, uid: user.user_id, wins: user.wins, losses: user.losses, about: user.about }
        return res.status(201).send(req.session.user);

    },

    updateUserAbout: async (req, res) => {
        const { about, uid } = req.body;
        const db = req.app.get("db");
        let result = await db.auth.update_userabout([about, uid]);
        let user = result[0];
        req.session.user = { username: user.username, uid: user.user_id, wins: user.wins, losses: user.losses, about: user.about }
        return res.status(201).send(req.session.user);
    },

    readUser: async (req, res) => {
        return res.status(201).send(req.session.user);
    }
}