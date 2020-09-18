import React, { Component } from 'react';
import {Nav, Navbar, Button} from "react-bootstrap";
import {withRouter, NavLink, Link} from "react-router-dom";

import "../../styles/header_style.css"

class Header extends Component{
    state = {
        isScrolled: false
    }

    componentDidMount() {
        document.addEventListener("scroll", (e) => {
            let position = document.scrollingElement.scrollTop;
            this.setState({
                isScrolled: position > 0
            });
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // document.removeEventListener("scroll");
    }


    render() {
        const { location } = this.props;
        return (
            <Navbar id="header" variant="dark" expand="md" scrolling dark fixed="top" className="px-3 px-sm-5 py-3"
                    style={{backgroundColor: (this.state.isScrolled ? "var(--background-faded" : "var(--transparent")}}>
                <Navbar.Brand href="/">zGrani</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="pt-2 pt-md-0">
                    <Nav className="ml-xs-auto ml-md-5 mr-xs-0 mr-md-auto" activeKey={location.pathname}>
                        <NavLink className="px-0 mx-md-2 py-1" to="/" exact>Strona główna</NavLink>
                        <NavLink className="px-0 mx-md-2 py-1" to="/przegladaj">Przeglądaj</NavLink>
                        <NavLink className="px-0 mx-md-2 py-1" to="/szukaj">Szukaj</NavLink>
                    </Nav>
                    <Nav.Item className="mt-3 mt-md-0 d-flex flex-row">
                        <Button className="mr-2 mt-1 mt-md-0" block variant="outline-accent" size="sm">Logowanie</Button>
                        <Button className="mt-1 mt-md-0" block variant="outline-accent" size="sm">Rejestracja</Button>
                    </Nav.Item>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(Header);

