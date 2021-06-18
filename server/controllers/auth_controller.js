const bcrypt = require('bcryptjs');

module.exports = {

    create: async (req, res) => {
        let {username, password, email} = req.body;
       
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
        req.session.user = {username: user.username, uid: user.user_id}
        return res.status(201).send(req.session.user);
        
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const db = req.app.get("db");
        const foundUser = await db.auth.read_user([email]);
        const user = foundUser[0];
        if (!user) {
          return res.status(201).send('User not found');
        }
        const isAuthenticated = bcrypt.compareSync(password, user.hash);
        if (!isAuthenticated) {
          return res.status(201).send('wrong password bro');
        }
        req.session.user = {username: user.username, uid: user.user_id}
        return res.status(201).send(req.session.user);
    },

    logout: async (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    }
}