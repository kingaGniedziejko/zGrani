import React, { Component } from 'react';
import {Image} from "react-bootstrap";

import "../../../styles/profile_style.css"

import userPhoto from '../../../images/lacey-williams-0c9CmxU0EJI-unsplash.jpg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faGuitar, faMusic } from "@fortawesome/free-solid-svg-icons";

import Blocks from "./Blocks";

class ProfileShortcut extends Component{
    render() {
        return (
            <div className={"profile-shortcut mb-5"}>
                <Image src={userPhoto} fluid className={"mb-2"}/>
                <h5 className={"m-0"}>Anna Kowalska</h5>
                <small className={"d-block mb-2"}>anna21</small>
                <Blocks elementsList={["szuka zespołu", "szuka zleceń"]}/>
                <div>
                    <div className={"d-flex flex-row mb-1"}>
                        <div className={"icon-container mr-2"}>
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                        </div>
                        <p className={"m-0"}>Polska, Wrocław</p>
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