import React, { Component } from 'react';
import {Nav, Navbar, Button} from "react-bootstrap";
import { withRouter } from "react-router-dom";

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


    render() {
        const { location } = this.props;
        return (
            <Navbar id="header" variant="dark" expand="md" scrolling dark fixed="top" className="px-5 py-3"
                    style={{backgroundColor: (this.state.isScrolled ? "var(--background-faded" : "var(--transparent")}}>
                <Navbar.Brand href="/">zGrani</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="pt-2 pt-md-0">
                    <Nav className="ml-xs-auto ml-md-5 mr-xs-0 mr-md-auto" activeKey={location.pathname}>
                        <Nav.Link className="px-0 mx-2" href="/">Strona główna</Nav.Link>
                        <Nav.Link className="px-0 mx-2" href="/przegladaj">Przeglądaj</Nav.Link>
                        <Nav.Link className="px-0 mx-2" href="/szukaj">Szukaj</Nav.Link>
                    </Nav>
                    <Nav.Item className="mt-3 mt-md-0">
                        <Button className="mr-2 mt-1 mt-md-0" variant="outline-light" size="sm">Logowanie</Button>
                        <Button className="mt-1 mt-md-0" variant="outline-light" size="sm">Rejestracja</Button>
                    </Nav.Item>

                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(Header);

