import React, { Component } from 'react';
import { Nav, Navbar } from "react-bootstrap";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import listensToClickOutside from 'react-onclickoutside';

import "../../../resources/styles/header_style.css"

import LoggedInButtons from "./LoggedInButtons";
import LoggedOutButtons from "./LoggedOutButtons";


class Header extends Component{
    state = {
        isScrolled: false,
        navbarExpanded: false
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

    handleClickOutside(e){
        this.hideNavbar();
    }

    hideNavbar = () => {
        this.setState({
            navbarExpanded: false
        });
    }

    render() {
        const { location, auth, user } = this.props;
        const buttons = auth.uid ? <LoggedInButtons user={user} uid={auth.uid} hideNavbar={this.hideNavbar}/> : <LoggedOutButtons hideNavbar={this.hideNavbar} />;

        return (
            <Navbar id="header" variant="dark" expand="md" collapseOnSelect expanded={this.state.navbarExpanded} fixed="top" className="px-3 px-sm-5 py-3"
                    style={{backgroundColor: (this.props.location.pathname === "/" ?
                            (this.state.isScrolled ? "var(--background-faded)" : "var(--transparent)")
                                : "var(--background-faded)")}}>
                <Navbar.Brand href="/" className={"accent-text"}>zGrani</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => this.setState({navbarExpanded: !this.state.navbarExpanded})} />
                <Navbar.Collapse id="basic-navbar-nav" className="pt-2 pt-md-0">
                    <Nav className="ml-xs-auto ml-md-5 mr-xs-0 mr-md-auto" activeKey={location.pathname}>
                        <NavLink className="px-0 mx-md-2 py-1" to="/" exact onClick={this.hideNavbar}>Strona główna</NavLink>
                        <NavLink className="px-0 mx-md-2 py-1" to="/przegladaj" onClick={this.hideNavbar}>Przeglądaj</NavLink>
                        <NavLink className="px-0 mx-md-2 py-1" to="/szukaj" onClick={this.hideNavbar}>Szukaj</NavLink>
                    </Nav>
                    { buttons }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        user: state.firebase.profile
    }
}

// export default connect(mapStateToProps)(listensToClickOutside(withRouter(Header)));

export default withRouter(connect(mapStateToProps)(listensToClickOutside(Header)));