import React, { Component } from 'react';
import {Image} from "react-bootstrap";

import "../../../resources/styles/profile_style.css"

import userPhoto from '../../../resources/images/lacey-williams-0c9CmxU0EJI-unsplash.jpg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faGuitar, faMusic } from "@fortawesome/free-solid-svg-icons";

import Blocks from "./Blocks";
import {Link} from "react-router-dom";

class ProfileShortcut extends Component{
    render() {
        const { user } = this.props;
        console.log(user);

        return (
            <div className={"profile-shortcut mb-5"}>
                <Link to={"/profil/" + user.id} className={"mb-2 d-block"}>
                    <Image src={userPhoto} fluid/>
                </Link>
                <Link to={"/profil/" + user.id}>
                    <h5>{user.name}</h5>
                </Link>
                <Link to={"/profil/" + user.id}>
                    <small className={"d-block mb-2"}>{user.login}</small>
                </Link>
                <Blocks elementsList={["szuka zespołu", "szuka zleceń"]}/>
                <div>
                    <div className={"d-flex flex-row mb-1"}>
                        <div className={"icon-container mr-2"}>
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                        </div>
                        <p className={"m-0"}>{user.city}</p>
                    </div>
                    <div className={"d-flex flex-row mb-1"}>
                        <div className={"icon-container mr-2"}>
                            <FontAwesomeIcon icon={faGuitar}/>
                        </div>
                        <p className={"m-0"}>Rock, Blues</p>
                    </div>
                    <div className={"d-flex flex-row mb-1"}>
                        <div className={"icon-container mr-2"}>
                            <FontAwesomeIcon icon={faMusic}/>
                        </div>
                        <p className={"m-0"}>Gitara, Pianino, Skrzypce</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileShortcut;