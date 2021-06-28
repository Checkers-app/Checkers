import React from "react";
import { Switch, Route } from "react-router-dom";


import FrontPage from "./components/FrontPage.js";
import Landingpage from "./components/LandingPage.js";
import ProfilePage from './components/ProfilePage'
import Checkerboard from "./components/Checkerboard.js";
import SingleCheckerboard from './components/singleCheckerboard.js';



export default (
  <Switch>
    <Route component={FrontPage} exact path="/" />
    <Route component={Landingpage} path="/landingpage" />
    <Route component={Checkerboard} path="/game" />
    <Route component={ProfilePage} path="/profile" />
    <Route component={SingleCheckerboard} path="/1PGame" />
  </Switch>
)