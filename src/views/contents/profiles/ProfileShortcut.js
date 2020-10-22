import React, { Component } from 'react';
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { useFirestoreConnect } from 'react-redux-firebase';


import "../../../resources/styles/profile_style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faGuitar, faMusic } from "@fortawesome/free-solid-svg-icons";

import Blocks from "./Blocks";
import Loader from "../../layouts/Loader";


// export default function ProfileShortcut(props) {
//
//
//     console.log(props.user.instrumentsId);
//
//     useFirestoreConnect((props.user.instrumentsId).map(instrumentId => ({
//         collection: 'instruments',
//         doc: instrumentId,
//         storeAs: "userInstruments"
//     })));
//
//     let instruments = useSelector((state) => state.firestore.data.userInstruments);
//
//
//     console.log(props.user.name, instruments);
//
//     return(
//         <div className={"profile-shortcut mb-5"}>
//             <Link to={"/profil/" + props.user.id} className={"mb-2 d-block"}>
//                 <Image src={props.user.imageUrl} fluid/>
//             </Link>
//             <Link to={"/profil/" + props.user.id} className={"mb-2 block"}>
//                 <h5>{props.user.name}</h5>
//             </Link>
//             <Blocks elementsList={["szuka zespołu", "szuka zleceń"]}/>
//             <div>
//                 <div className={"d-flex flex-row mb-1"}>
//                     <div className={"icon-container mr-2"}>
//                         <FontAwesomeIcon icon={faMapMarkerAlt}/>
//                     </div>
//                     <p className={"m-0"}>{props.user.city}</p>
//                 </div>
//                 <div className={"d-flex flex-row mb-1"}>
//                     <div className={"icon-container mr-2"}>
//                         <FontAwesomeIcon icon={faGuitar}/>
//                     </div>
//                     <p className={"m-0"}>Rock, Blues</p>
//                 </div>
//                 <div className={"d-flex flex-row mb-1"}>
//                     <div className={"icon-container mr-2"}>
//                         <FontAwesomeIcon icon={faMusic}/>
//                     </div>
//                     <p className={"m-0"}>Gitara, Pianino, Skrzypce</p>
//                 </div>
//             </div>
//         </div>
//     );
// }


class ProfileShortcut extends Component{

    render () {
        const { user, voivodeships, instruments, genres } = this.props;
        if (!voivodeships || !instruments || !genres) return <Loader/>

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
                    <Image src={ user.imageUrl } fluid/>
                </Link>
                <Link to={ "/profil/" + user.id } className={"mb-2 block"}>
                    <h5>{ user.name }</h5>
                </Link>
                <Blocks elementsList={["szuka zespołu", "szuka zleceń"]}/>
                <div>
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
                    <div className={"d-flex flex-row mb-1"}>
                        <div className={"icon-container mr-2"}>
                            <FontAwesomeIcon icon={ faGuitar }/>
                        </div>
                        <p className={"m-0"}>{ instrumentsDisplay }</p>
                    </div>
                </div>
            </div>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        voivodeships: state.firestore.data.voivodeships,
        genres: state.firestore.data.genres,
        instruments: state.firestore.data.instruments
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {collection: "voivodeships"},
        {collection: "genres", orderBy: "name"},
        {collection: "instruments", orderBy: "name"},
        {collection: "status"}
    ])
)(ProfileShortcut);