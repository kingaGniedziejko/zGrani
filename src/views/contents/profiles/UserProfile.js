import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Gallery from "react-photo-gallery";
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux"

import "../../../resources/styles/profile_style.css"

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

        const { user, profile, auth } = this.props;

        if (user === null) return <ErrorPage/>
        if (user === undefined) return <Loader/>

        console.log(this.props);

        const { id } = this.props.match.params;

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
            <div id={"user-profile"} className={"page-content"}>
                <div className={"section py-4 py-md-0"} style={{backgroundColor: "var(--background-light)"}}>
                    <Container className={"user-info"}>
                        <Row>
                            <Col md={5}>
                                <Image className={"user-photo"} src={user.imageUrl} fluid />
                            </Col>
                            <Col className={"pt-3"}>
                                <h4 className={"mb-1"}>{ user.name }</h4>
                                {/*<small className={"d-block mb-2"}>{ user.login }</small>*/}
                                <p className={"mb-3"}>{ user.isArtist ? "Artysta" : "Zespół" }</p>
                                <Blocks elementsList={["--szuka zespołu--", "--szuka zleceń--"]} align={"start"}/>
                                <div className={"mb-4"}>
                                    <div className={"d-flex flex-row mb-1"}>
                                        <div className={"icon-container mr-2"}>
                                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                                        </div>
                                        <p className={"m-0"}>{ "--Województwo--, " + user.city }</p>
                                    </div>
                                </div>
                                { button }
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={"section py-4 py-md-0 pt-md-5 pb-md-5 mt-md-4"}>
                    <Container>
                        <Row>
                            <Col className={"text-center"}>
                                <h5 className={"mb-3"}>Opis</h5>
                                <p>{"description"}</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={"section background-light py-5"}>
                    <Container>
                        <Row>
                            <Col md={6} className={"text-center"}>
                                <h5 className={"mb-3"}>Gatunki</h5>
                                <Blocks elementsList={["Rock", "Classic", "Alternative", "Blues", "Ska"]} align={"center"}/>
                            </Col>
                            <Col md={6} className={"text-center"}>
                                <h5 className={"mb-3"}>Instrumenty</h5>
                                <Blocks elementsList={["Gitara", "Pianino", "Skrzypce"]} align={"center"}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={"section py-5"}>
                    <Container>
                        <Row className={"justify-content-center"}>
                            <Col className={"text-center align-self-center"} md={10} lg={8}>
                                <h5 className={"mb-3"}>Zespoły</h5>
                                <BlocksWithButton elementsList={[{name: "Zespoleni", path: "", buttonText: "Odwiedź profil"}]}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={"section background-light py-5"}>
                    <Container>
                        <Row className={"justify-content-center"}>
                            <Col className={"text-center align-self-center"}>
                                <h5 className={"mb-4"}>Galeria</h5>
                                <Gallery photos={photos} direction={"column"} margin={10}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={"section py-5"}>
                    <Container>
                        <Row className={"justify-content-center"}>
                            <Col className={"text-center align-self-center d-flex flex-column align-items-center"}>
                                <h5 className={"mb-4"}>Filmy</h5>
                                {/*<ReactPlayer url={"https://www.youtube.com/watch?v=6bbv_W2kLSg&ab_channel=KickItCrew"}/>*/}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state);

    return {
        user: state.firestore.data.users && state.firestore.data.users[ownProps.match.params.id],
        profile: state.firestore.ordered.profiles && state.firestore.ordered.profiles[0],
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {collection: "users", doc: props.match.params.id},
        {collection: "profiles", where: ["userId", "==", props.match.params.id]}
    ])
)(UserProfile);