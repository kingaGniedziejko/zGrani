import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import '../../styles/content_style.css'

import Home from "../pages/Home";
import Browse from "../pages/Browse";
import Search from "../pages/Search";

class Content extends Component{
    render() {
        return (
            <div className={"content"}>
                <Switch>
                    <Route exact path={"/"} component={Home}/>
                    <Route exact path={"/przegladaj"} component={Browse}/>
                    <Route exact path={"/szukaj"} component={Search}/>
                </Switch>
            </div>
        );
    }
}

export default Content;