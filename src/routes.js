import React from "react";
import {Switch, Route} from "react-router-dom";


import FrontPage from "./components/FrontPage.js";
import Landingpage from "./components/LandingPage.js";
import Checkerboard from "./components/Checkerboard.js";


export default (
    <Switch>
        <Route component = {FrontPage} exact path = "/" />
        <Route component = {Landingpage} path = "/landingpage" />
        <Route component = {Checkerboard} path = "/game" />
    </Switch>
)