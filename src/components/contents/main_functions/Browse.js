import React, { Component } from 'react';
import {Col, Container, Nav, Row} from "react-bootstrap";
import { NavLink, withRouter, Switch, Route } from "react-router-dom";

import "../../../styles/browse_style.css"
import ProfileShortcut from "../profiles/ProfileShortcut";
import { ChevronDown } from "react-bootstrap-icons";

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
                            <div className={"section d-flex flex-column align-items-center"}>
                                <Container>
                                    <Row>
                                        <Col sm={6} lg><ProfileShortcut/></Col>
                                        <Col sm={6} lg><ProfileShortcut/></Col>
                                        <Col sm={6} lg><ProfileShortcut/></Col>
                                        <Col sm={6} lg><ProfileShortcut/></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} lg><ProfileShortcut/></Col>
                                        <Col sm={6} lg><ProfileShortcut/></Col>
                                        <Col sm={6} lg><ProfileShortcut/></Col>
                                        <Col sm={6} lg><ProfileShortcut/></Col>
                                    </Row>
                                </Container>
                                <div className={"d-flex flex-column align-items-center"}>
                                    <p className={"m-0"}>Więcej</p>
                                    <ChevronDown/>
                                </div>
                            </div>
                        </Route>
                        <Route exact path={"/przegladaj/zespoly"}>
                            <div>
                                <p>Filtruj:</p>
                            </div>
                        </Route>
                    </Switch>
                </div>
           </div>
        );
    }
}

export default withRouter(Browse);