import React, { Component } from 'react';
import { Button, Image, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../store/actions/authActions";

import userPhoto from '../../../resources/images/hemerson-coelho-Lf-Wbrr6_-Y-unsplash.jpg';

class LoggedInButtons extends Component{
    render() {
        const { profile, uid } = this.props;
        if (!profile.isLoaded) return ""
        return (
            <Nav.Item className="mt-3 mt-md-0 d-flex flex-row">
                    <div className="mr-4 mt-1 mt-md-0 d-flex flex-row">
                        <Link to={ "/profil/" + uid }>
                            <Image src={userPhoto} height={31} width={31} className={"cover border mr-2"}/>
                        </Link>
                        <Link to={ "/profil/" + uid } className={"pt-1"}>{profile.name}</Link>
                    </div>
                <Link to={"/"} className="mt-1 mt-md-0 ml-auto">
                    <Button block variant="outline-white" size="sm" onClick={this.props.logout}>Wyloguj</Button>
                </Link>
            </Nav.Item>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(LoggedInButtons);