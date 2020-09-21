import React, { Component } from 'react';
import {Button, Image, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

import userPhoto from '../../images/lacey-williams-0c9CmxU0EJI-unsplash.jpg';

class LoggedInButtons extends Component{
    render() {
        return (
            <Nav.Item className="mt-3 mt-md-0 d-flex flex-row">
                <Link className="mr-4 mt-1 mt-md-0 d-flex flex-row">
                    <div>
                        <Image src={userPhoto} height={31} width={31} className={"cover border mr-2"}/>
                        <Link to={""} className={"pt-1"}>userName</Link>
                    </div>
                </Link>
                <Link to={"/"} className="mt-1 mt-md-0">
                    <Button block variant="outline-white" size="sm">Wyloguj</Button>
                </Link>
            </Nav.Item>
        );
    }
}

export default LoggedInButtons;