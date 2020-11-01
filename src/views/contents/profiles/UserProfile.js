import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Gallery from "react-photo-gallery";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import "../../../resources/styles/profile_style.css";

import userPhoto from '../../../resources/images/hemerson-coelho-Lf-Wbrr6_-Y-unsplash.jpg';
import photo1 from '../../../resources/images/lacey-williams-0c9CmxU0EJI-unsplash.jpg';
import photo2 from '../../../resources/images/glenn-van-de-wiel-DWHSc8o8K9Y-unsplash.jpg';
import photo3 from '../../../resources/images/oscar-keys-ojVMh1QTVGY-unsplash.jpg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { ExclamationCircle } from "react-bootstrap-icons";

import Blocks from "./Blocks";
import BlocksWithButton from "./BlocksWithButton";
import ErrorPage from "../../layouts/ErrorPage";
import Loader from "../../layouts/Loader";
// import ReactPlayer from "react-player";

class UserProfile extends Component{
    render() {
        const { user, profile, auth, status, voivodeships, genres, instruments } = this.props;
        const { id } = this.props.match.params;

        if (user === null) return <ErrorPage/>
        if (user === undefined || !status || !voivodeships || !instruments || !genres) return <Loader/>

        let sectionArray = [];

        if (profile && profile.description) sectionArray.push(this.descriptionSection);
        sectionArray.push(this.genresInstrumentsSection);
        if (user.isArtist && user.bandsId) sectionArray.push(this.bandsSection);
        if (!user.isArtist && user.members) sectionArray.push(this.membersSection);
        if (profile && profile.records) sectionArray.push(this.recordsSection);
        if (profile && profile.gallery.length !== 0) sectionArray.push(this.gallerySection);
        if (profile && profile.videos) sectionArray.push(this.videoSection);

        let isBackgroundLight = true;

        return (
            <div id={"user-profile"} className={"page-content"}>
                {this.userInfoSection(user, profile, auth, id, status, voivodeships, instruments)}

                {sectionArray.map((section, index) => {
                    isBackgroundLight = !isBackgroundLight;
                    return (
                        <div key={ index }
                             className={"section py-5" + (isBackgroundLight? " background-light" : "")}>
                            <Container>
                                { section() }
                            </Container>
                        </div>
                    );
                })}
            </div>
        );
    }

    userInfoSection = (user, profile, auth, id, status, voivodeships, instruments) => {

        let statusArray = user.status && user.status.map(stat => {
            return {
                name: status[stat.statusId].name + (stat.instrumentId ? (": " + instruments[stat.instrumentId].name) : "")
            }});

        let voivodeship = voivodeships[user.voivodeshipId].name;

        const button = auth.uid && auth.uid === id ?
            <>
                <Link to={"/profil/" + id + "/edytowanie"} className={""}>
                    <Button variant="outline-accent" size="sm">Edytuj profil</Button>
                </Link>
                { profile === undefined ? <ExclamationCircle className={"ml-3"} size={22}/> : ""}
            </>
            :
            <Link to={""} className="mt-auto">
                <Button variant="outline-accent" size="sm">Skontaktuj się</Button>
            </Link>

        return (
            <>
                <div className={"section py-4 py-md-0"} style={{backgroundColor: "var(--background-light)"}}>
                    <Container className={"user-info"}>
                        <Row>
                            <Col md={5}>
                                <Image className={"user-photo shadow"} src={user.imageUrl} fluid />
                            </Col>
                            <Col className={"pt-3"}>
                                <h4 className={"mb-1"}>{ user.name }</h4>
                                <p className={"mb-3"}>{ user.isArtist ? "Artysta" : "Zespół" }</p>
                                {statusArray
                                    ? <Blocks elementsList={ statusArray } align={"start"}/>
                                    : null
                                }
                                <div className={"mb-4"}>
                                    <div className={"d-flex flex-row mb-1"}>
                                        <div className={"icon-container mr-2"}>
                                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                                        </div>
                                        <p className={"m-0"}>{ voivodeship + ", " + user.city }</p>
                                    </div>
                                </div>
                                { button }
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div style={{height: "3rem"}}/>
            </>
        );
    }

    descriptionSection = () => {
        const { profile } = this.props;

        return (
            <Row>
                <Col className={"text-center"}>
                    <h5 className={"mb-3"}>Opis</h5>
                    <p>{ profile.description }</p>
                </Col>
            </Row>
        );
    }

    genresInstrumentsSection = () => {
        const { user, genres, instruments } = this.props;

        let genresNames = [];
        let instrumentsNames = [];

        user.genresId && user.genresId.forEach(genre => genresNames.push(genres[genre]));
        user.instrumentsId && user.instrumentsId.forEach(instr => instrumentsNames.push(instruments[instr]));

        return (
            <Row>
                <Col md={6} className={"text-center"}>
                    <h5 className={"mb-3"}>Gatunki</h5>
                    <Blocks elementsList={ genresNames } align={"center"}/>
                </Col>
                <Col md={6} className={"text-center"}>
                    <h5 className={"mb-3"}>Instrumenty</h5>
                    <Blocks elementsList={ instrumentsNames } align={"center"}/>
                </Col>
            </Row>
        )
    }

    bandsSection = () => {
        return (
            <Row className={"justify-content-center"}>
                <Col className={"text-center align-self-center"} md={10} lg={8}>
                    <h5 className={"mb-3"}>Zespoły</h5>
                    <BlocksWithButton elementsList={[{name: "Zespoleni", path: "", buttonText: "Odwiedź profil"}]}/>
                </Col>
            </Row>
        );
    }

    membersSection = () => {

    }

    recordsSection = () => {

    }

    gallerySection = () => {
        const photos = [
            {
                src: userPhoto,
                width: 3,
                height: 4
            },
            {
                src: photo1,
                width: 4,
                height: 3
            },
            {
                src: photo2,
                width: 4,
                height: 3
            },
            {
                src: photo3,
                width: 4,
                height: 3
            }
        ]

        return (
            <Row className={"justify-content-center"}>
                <Col className={"text-center align-self-center"}>
                    <h5 className={"mb-4"}>Galeria</h5>
                    <Gallery photos={photos} direction={"column"} margin={10}/>
                </Col>
            </Row>
        );
    }

    videoSection = () => {
        return (
            <Row className={"justify-content-center"}>
                <Col className={"text-center align-self-center d-flex flex-column align-items-center"}>
                    <h5 className={"mb-4"}>Filmy</h5>
                    {/*<ReactPlayer url={"https://www.youtube.com/watch?v=6bbv_W2kLSg&ab_channel=KickItCrew"}/>*/}
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.firestore.data.users && state.firestore.data.users[ownProps.match.params.id],
        profile: state.firestore.ordered.profiles && state.firestore.ordered.profiles[0],
        auth: state.firebase.auth,
        status: state.firestore.data.status,
        voivodeships: state.firestore.data.voivodeships,
        genres: state.firestore.data.genres,
        instruments: state.firestore.data.instruments
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {collection: "users", doc: props.match.params.id},
        {collection: "profiles", where: ["userId", "==", props.match.params.id]},
        {collection: "status"},
        {collection: "voivodeships"},
        {collection: "genres", orderBy: "name"},
        {collection: "instruments", orderBy: "name"}
    ])
)(UserProfile);