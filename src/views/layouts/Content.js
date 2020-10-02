import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import '../../resources/styles/content_style.css'

import Home from "../contents/Home";
import Browse from "../contents/browse/Browse";
import Search from "../contents/search/Search";
import Login from "../contents/auth/Login";
import Signup from "../contents/auth/Signup";
import UserProfile from "../contents/profiles/UserProfile";
import UserProfileCreate from "../contents/profiles/UserProfileCreate";
import UserProfileEdit from "../contents/profiles/UserProfileEdit";

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
                    <Route exact path={"/rejestracja/:type"} component={UserProfileCreate}/>

                    <Route exact path={"/profil/:login"} component={UserProfile}/>
                    <Route path={"/profil/:login/edytowanie"} component={UserProfileEdit}/>

                </Switch>
            </div>
        );
    }
}

export default Content;