import React, { Component } from 'react';
import {Button, Image, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

import userPhoto from '../../images/hemerson-coelho-Lf-Wbrr6_-Y-unsplash.jpg';

class LoggedInButtons extends Component{
    render() {
        return (
            <Nav.Item className="mt-3 mt-md-0 d-flex flex-row">
                    <div className="mr-4 mt-1 mt-md-0 d-flex flex-row">
                        <Link to={"/profil"}>
                            <Image src={userPhoto} height={31} width={31} className={"cover border mr-2"}/>
                        </Link>
                        <Link to={"/profil"} className={"pt-1"}>userName</Link>
                    </div>
                <Link to={"/"} className="mt-1 mt-md-0">
                    <Button block variant="outline-white" size="sm">Wyloguj</Button>
                </Link>
            </Nav.Item>
        );
    }
}

export default LoggedInButtons;