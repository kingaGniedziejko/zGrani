import React, { Component } from 'react';
import { Nav } from "react-bootstrap";
import { NavLink, withRouter, Switch, Route } from "react-router-dom";

import "../../../styles/browse_style.css"

import BrowseContent from "./BrowseContent";

class Browse extends Component{
    render() {
        const { location } = this.props;
        return (
           <div id={"browse"} className={"page-content"}>
                <div className={"section-light d-flex flex-column align-items-center py-5"}>
                    <h3>Przeglądaj</h3>
                    <Nav className="mb-5" activeKey={location.pathname}>
                        <NavLink className="py-1 mx-2" to="/przegladaj" exact>Artyści</NavLink>
                        <NavLink className="py-1 mx-2" to="/przegladaj/zespoly">Zespoły</NavLink>
                    </Nav>
                    <Switch>
                        <Route exact path={"/przegladaj"}>
                            <BrowseContent type={"artysta"}/>
                        </Route>
                        <Route exact path={"/przegladaj/zespoly"}>
                            <BrowseContent type={"zespol"}/>
                        </Route>
                    </Switch>
                </div>
           </div>
        );
    }
}

export default withRouter(Browse);