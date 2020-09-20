import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import '../../styles/content_style.css'

import Home from "../pages/Home";
import Browse from "../pages/Browse";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SignupArtist from "../pages/SignupArtist";
import SignupBand from "../pages/SignupBand";

class Content extends Component{
    render() {
        return (
            <div className={"content"}>
                <Switch>
                    <Route exact path={"/"} component={Home}/>
                    <Route path={"/przegladaj"} component={Browse}/>
                    <Route path={"/szukaj"} component={Search}/>

                    <Route exact path={"/logowanie"} component={Login}/>
                    <Route exact path={"/rejestracja"} component={Signup}/>
                    <Route exact path={"/rejestracja/artysta"} component={SignupArtist}/>
                    <Route exact path={"/rejestracja/zespol"} component={SignupBand}/>

                </Switch>
            </div>
        );
    }
}

export default Content;