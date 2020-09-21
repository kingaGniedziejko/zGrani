import React, { Component } from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {withRouter, NavLink} from "react-router-dom";

import "../../styles/header_style.css"

import LoggedInButtons from "./LoggedInButtons";
import LoggedOutButtons from "./LoggedOutButtons";


class Header extends Component{
    state = {
        isScrolled: false
    }

    componentDidMount() {
        let path = this.props.location.pathname;
        this.setState({
            isScrolled: path !== "/"
        });

        document.addEventListener("scroll", (e) => {
            let position = document.scrollingElement.scrollTop;
            let path = this.props.location.pathname;
            this.setState({
                isScrolled: position > 0 || path !== "/"
            });
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // document.removeEventListener("scroll");
    }


    render() {
        const { location } = this.props;
        return (
            <Navbar id="header" variant="dark" expand="md" fixed="top" className="px-3 px-sm-5 py-3"
                    style={{backgroundColor: (this.props.location.pathname === "/" ?
                            (this.state.isScrolled ? "var(--background-faded)" : "var(--transparent)")
                                : "var(--background-faded)")}}>
                <Navbar.Brand href="/" className={"accent-text"}>zGrani</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="pt-2 pt-md-0">
                    <Nav className="ml-xs-auto ml-md-5 mr-xs-0 mr-md-auto" activeKey={location.pathname}>
                        <NavLink className="px-0 mx-md-2 py-1" to="/" exact>Strona główna</NavLink>
                        <NavLink className="px-0 mx-md-2 py-1" to="/przegladaj">Przeglądaj</NavLink>
                        <NavLink className="px-0 mx-md-2 py-1" to="/szukaj">Szukaj</NavLink>
                    </Nav>
                    <LoggedInButtons/>
                    <LoggedOutButtons/>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(Header);

