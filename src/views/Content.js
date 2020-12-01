import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";

import '../resources/styles/content_style.css'

import HomePage from "./layout/static_pages/HomePage";
import Browse from "./browse/Browse";
import Search from "./search/Search";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import UserProfile from "./users/UserProfile";
import UserProfileCreate from "./users/UserProfileCreate";
import UserProfileEdit from "./users/UserProfileEdit";
import TermsOfService from "./layout/static_pages/TermsOfService";
import PrivacyPolicy from "./layout/static_pages/PrivacyPolicy";
import ForgotPassword from "./auth/ForgotPassword";
import EmailVerification from "./auth/EmailVerification";
import ErrorPage from "./layout/static_pages/ErrorPage";

class Content extends Component{
    render() {
        return (
            <div className={"content"}>
                    <Switch>
                        <Route exact path={"/"} component={HomePage}/>
                        <Route path={"/przegladaj"} component={Browse}/>
                        <Route path={"/szukaj"} component={Search}/>

                        <Route exact path={"/logowanie"} component={Login}/>
                        <Route exact path={"/zapomnialem-hasla"} component={ForgotPassword}/>
                        <Route exact path={"/rejestracja"} component={Signup}/>
                        <Route exact path={"/rejestracja/:type"} component={UserProfileCreate}/>
                        <Route exact path={"/potwierdzanie-adresu-email"} component={EmailVerification}/>

                        <Route exact path={"/profil/:id"} component={UserProfile}/>

                        <Route exact path={"/regulamin"} component={TermsOfService}/>
                        <Route exact path={"/polityka-prywatnosci"} component={PrivacyPolicy}/>

                        <Route path={"/nie-znaleziono"} component={ErrorPage} status={404}/>

                        <Route>
                            <Redirect to={"/nie-znaleziono"}/>
                        </Route>

                    </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Content)