require("dotenv").config();
const express = require('express');
const massive = require("massive");
const session = require('express-session');
const auth_controller = require("./controllers/auth_controller.js");


const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env;
const app = express();
app.use(express.json());

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000*60*24*60
        }
    })
);

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(dbInstance => {
    app.set("db", dbInstance);
    console.log("database connected");
})
.catch(err => console.log(err));

app.post("/auth/create", auth_controller.create);
app.post("/auth/login" , auth_controller.login);
app.get( "/auth/logout", auth_controller.logout);

app.listen(SERVER_PORT, () => console.log(`server listening on port ${SERVER_PORT}`))
