import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
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
import { faMapMarkerAlt, faGuitar, faMusic } from "@fortawesome/free-solid-svg-icons";

import Blocks from "./Blocks";
import BlocksWithButton from "./BlocksWithButton";
import ReactPlayer from "react-player";

class UserProfile extends Component{
    render() {
        const { login } = this.props.match.params;
        const { description } = this.props.profile;

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
            <div id={"user-profile"} className={"page-content"}>
                <div className={"section py-4 py-md-0"} style={{backgroundColor: "var(--background-light)"}}>
                    <Container className={"user-info"}>
                        <Row>
                            <Col md={5}>
                                <Image className={"user-photo"} src={userPhoto} fluid />
                            </Col>
                            <Col className={"pt-3"}>
                                <h5 className={"m-0"}>Anna Kowalska</h5>
                                <small className={"d-block mb-2"}>{login}</small>
                                <h6 className={"mb-3"}>Artysta</h6>
                                <Blocks elementsList={["szuka zespołu", "szuka zleceń"]} align={"start"}/>
                                <div className={"mb-4"}>
                                    <div className={"d-flex flex-row mb-1"}>
                                        <div className={"icon-container mr-2"}>
                                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                                        </div>
                                        <p className={"m-0"}>Polska, Wrocław</p>
                                    </div>
                                </div>
                                <Link to={""} className="mt-auto">
                                    <Button variant="outline-accent" size="sm">Skontaktuj się</Button>
                                </Link>
                                <Link to={"/profil/anna21/edytowanie"} className={""}>
                                    <Button variant="outline-accent" size="sm">Edytuj profil</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={"section py-4 py-md-0 pt-md-5 pb-md-5 mt-md-4"}>
                    <Container>
                        <Row>
                            <Col className={"text-center"}>
                                <h5 className={"mb-3"}>Opis</h5>
                                <p>{description}</p>
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

const mapStateToProps = (state) => {
    console.log(state);
    return {
        // profile: state.firestore.ordered.users
        profile: state.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['users'])
)(UserProfile);