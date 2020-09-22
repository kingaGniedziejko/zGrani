import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import '../../styles/content_style.css'

import Home from "../contents/main_functions/Home";
import Browse from "../contents/main_functions/Browse";
import Search from "../contents/main_functions/Search";
import Login from "../contents/auth/Login";
import Signup from "../contents/auth/Signup";
import SignupArtist from "../contents/auth/SignupArtist";
import SignupBand from "../contents/auth/SignupBand";
import UserProfile from "../contents/profiles/UserProfile";

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
                    <Route exact path={"/profil"} component={UserProfile}/>

                </Switch>
            </div>
        );
    }
}

export default Content;