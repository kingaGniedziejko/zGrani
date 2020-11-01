import React, { Component } from 'react';
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import "../../../resources/styles/profile_style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faGuitar, faMusic } from "@fortawesome/free-solid-svg-icons";

import Blocks from "./Blocks";

class ProfileShortcut extends Component {
    render () {
        const { user, status, voivodeships, instruments, genres } = this.props;
        if ( !status || !voivodeships || !instruments || !genres ) return "";

        let statusArray = user.status && user.status.map(stat => {
            return {
                name: status[stat.statusId].name + (stat.instrumentId ? (": " + instruments[stat.instrumentId].name) : "")
            }});
        let voivodeship = voivodeships[user.voivodeshipId].name;

        let genresNames = [];
        let instrumentsNames = [];

        user.genresId && user.genresId.forEach(genre => genresNames.push(genres[genre].name));
        user.instrumentsId && user.instrumentsId.forEach(instr => instrumentsNames.push(instruments[instr].name));

        let genresDisplay = genresNames.join(", ");
        let instrumentsDisplay = instrumentsNames.join(", ");

        return(
            <div className={"profile-shortcut mb-5"}>
                <Link to={ "/profil/" + user.id } className={"mb-2 d-block"}>
                    <Image src={ user.imageUrl } className={"profile-shortcut-picture"} fluid/>
                </Link>
                <Link to={ "/profil/" + user.id } className={"mb-3 block"}>
                    <h5>{ user.name }</h5>
                </Link>
                { statusArray
                    ? <Blocks elementsList={statusArray}/>
                    : null
                }
                <div className={"mt-2"}>
                    <div className={"d-flex flex-row mb-1"}>
                        <div className={"icon-container mr-2"}>
                            <FontAwesomeIcon icon={ faMapMarkerAlt }/>
                        </div>
                        <p className={"m-0"}>{ voivodeship + ", " + user.city }</p>
                    </div>
                    <div className={"d-flex flex-row mb-1"}>
                        <div className={"icon-container mr-2"}>
                            <FontAwesomeIcon icon={ faMusic }/>
                        </div>
                        <p className={"m-0"}>{ genresDisplay }</p>
                    </div>
                    { user.isArtist ?
                        <div className={"d-flex flex-row mb-1"}>
                            <div className={"icon-container mr-2"}>
                                <FontAwesomeIcon icon={faGuitar}/>
                            </div>
                            <p className={"m-0"}>{instrumentsDisplay}</p>
                        </div>
                        : ""
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.firestore.data.status,
        voivodeships: state.firestore.data.voivodeships,
        genres: state.firestore.data.genres,
        instruments: state.firestore.data.instruments
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => [
        {collection: "status"},
        {collection: "voivodeships"},
        {collection: "genres", orderBy: "name"},
        {collection: "instruments", orderBy: "name"}
    ])
)(ProfileShortcut);