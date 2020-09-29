import React, { Component } from 'react';
import {Button, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

class LoggedOutButtons extends Component{
    render() {
        return (
            <Nav.Item className="mt-3 mt-md-0 d-flex flex-row">
                <Link to={"/logowanie"} className="mr-2 mt-1 mt-md-0 block">
                    <Button block variant="outline-white" size="sm">Logowanie</Button>
                </Link>
                <Link to={"/rejestracja"} className="mt-1 mt-md-0 block">
                    <Button block variant="outline-white" size="sm">Rejestracja</Button>
                </Link>
            </Nav.Item>
        );
    }
}

export default LoggedOutButtons;