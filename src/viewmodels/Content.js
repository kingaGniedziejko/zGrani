import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";

import '../resources/styles/content_style.css'

import HomePage from "../views/HomePage";
import Browse from "./browse/Browse";
import Search from "./search/Search";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import UserProfile from "./profiles/UserProfile";
import UserProfileCreate from "./profiles/UserProfileCreate";
import UserProfileEdit from "./profiles/UserProfileEdit";
import TermsOfService from "../views/TermsOfService";
import PrivacyPolicy from "../views/PrivacyPolicy";
import ForgotPassword from "./auth/ForgotPassword";
import EmailVerification from "./auth/EmailVerification";

class Content extends Component{
    render() {
        return (
            <div className={"content"}>
                {/*{(this.props.auth.uid && !this.props.auth.emailVerified) ?*/}
                {/*    <Switch>*/}
                {/*        <Route exact path={"/"} component={EmailVerification}/>*/}
                {/*        <Route path={"/przegladaj"} component={EmailVerification}/>*/}
                {/*        <Route path={"/szukaj"} component={EmailVerification}/>*/}

                {/*        <Route exact path={"/logowanie"} component={EmailVerification}/>*/}
                {/*        <Route exact path={"/zapomnialem-hasla"} component={EmailVerification}/>*/}
                {/*        <Route exact path={"/rejestracja"} component={EmailVerification}/>*/}
                {/*        <Route exact path={"/rejestracja/:type"} component={EmailVerification}/>*/}
                {/*        <Route exact path={"/potwierdzanie-adresu-email"} component={EmailVerification}/>*/}

                {/*        <Route exact path={"/profil/:id"} component={EmailVerification}/>*/}
                {/*        <Route path={"/profil/:id/edytowanie"} component={EmailVerification}/>*/}

                {/*        <Route exact path={"/regulamin"} component={EmailVerification}/>*/}
                {/*        <Route exact path={"/polityka-prywatnosci"} component={EmailVerification}/>*/}

                {/*    </Switch>*/}

                {/*    :*/}
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
                        <Route path={"/profil/:id/edytowanie"} component={UserProfileEdit}/>

                        <Route exact path={"/regulamin"} component={TermsOfService}/>
                        <Route exact path={"/polityka-prywatnosci"} component={PrivacyPolicy}/>

                    </Switch>
                {/*}*/}
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