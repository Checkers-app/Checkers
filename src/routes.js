import React from "react";
import {Switch, Route} from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Rooms from "./components/Rooms.js";


export default (
    <Switch>
        <Route component = {Login} exact path = "/" />
        <Route component = {Register} path = "/register" />
        <Route component = {Rooms} path = "/rooms" />
    </Switch>
)