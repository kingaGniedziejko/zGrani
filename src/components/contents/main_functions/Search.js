import React, { Component } from 'react';
import { Nav } from "react-bootstrap";
import { NavLink, withRouter, Switch, Route } from "react-router-dom";

class Search extends Component{
    render() {
        const { location } = this.props;
        return (
            <div id={"search"} className={"page-content"}>
                <div className={"d-flex flex-column align-items-center py-5"}>
                    <h3>Szukaj</h3>
                    <Nav className="mb-5" activeKey={location.pathname}>
                        <NavLink className="py-1 mx-2" to="/szukaj" exact>Artyści</NavLink>
                        <NavLink className="py-1 mx-2" to="/szukaj/zespoly">Zespoły</NavLink>
                    </Nav>
                    <Switch>
                        <Route exact path={"/szukaj"}>
                            <div>
                                <p>artyści</p>
                            </div>
                        </Route>
                        <Route exact path={"/szukaj/zespoly"}>
                            <div>
                                <p>zespoły</p>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(Search);