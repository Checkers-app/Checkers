import React from "react";
import {Switch, Route} from "react-router-dom";


import FrontPage from "./components/FrontPage.js";
import Rooms from "./components/Rooms.js";



export default (
    <Switch>
        <Route component = {FrontPage} exact path = "/" />
        <Route component = {Rooms} path = "/rooms" />
    </Switch>
)