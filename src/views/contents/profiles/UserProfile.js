import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Button, Col, Container, Form, Image as Img, Modal, Row} from "react-bootstrap";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import emailjs from 'emailjs-com';
// import ReactPlayer from "react-player";
import isEmpty from "validator/es/lib/isEmpty";
import isEmail from "validator/es/lib/isEmail";

import "../../../resources/styles/profile_style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { ExclamationCircle } from "react-bootstrap-icons";

import Blocks from "./Blocks";
import BlocksWithButton from "./BlocksWithButton";
import ErrorPage from "../../layouts/ErrorPage";
import Loader from "../../layouts/Loader";
import ReactAudioPlayer from "react-audio-player";

class UserProfile extends Component {
    state = {
        modalShow: false,

        name: (this.props.activeUser.isLoaded && this.props.activeUser.isEmpty) || (!this.props.activeUser.isLoaded && this.props.activeUser.isEmpty) ? '' : this.props.activeUser.name,
        email: this.props.auth && this.props.auth.isLoaded && this.props.auth.isEmpty ? '' : this.props.auth.email,
        subject: '',
        message: '',

        errors: {}
    }

    componentDidMount() {
        if (this.props.activeUser.isLoaded){
            this.setState({
                name: this.props.activeUser.name
            })
        }
    }

    render() {
        const { user, profile, auth, users, status, voivodeships, genres, instruments } = this.props;
        const { id } = this.props.match.params;

        if (user === null) return <ErrorPage/>
        if (user === undefined || !users || !status || !voivodeships || !instruments || !genres) return <Loader/>

        let sectionArray = [];

        if (profile && profile.description) sectionArray.push(this.descriptionSection);
        sectionArray.push(this.genresInstrumentsMembersSection);
        if (user.isArtist && user.bandsId) sectionArray.push(this.bandsSection);
        if (profile && profile.recordings) sectionArray.push(this.recordsSection);
        if (profile && profile.imageGallery && profile.imageGallery.length !== 0) sectionArray.push(this.gallerySection);
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
            <>
                <Button variant="outline-accent" size="sm" onClick={() => {this.setState({
                    modalShow:true,
                    name: (this.props.activeUser.isLoaded && this.props.activeUser.isEmpty) || (!this.props.activeUser.isLoaded && this.props.activeUser.isEmpty) ? '' : this.props.activeUser.name,
                })}}>Skontaktuj się</Button>
                {this.displayMessageEdit()}
            </>

        return (
            <>
                <div className={"section py-4 py-lg-0"} style={{backgroundColor: "var(--background-light)"}}>
                    <Container className={"user-info"}>
                        <Row>
                            <Col md={5} className={"d-flex flex-row"}>
                                <Img className={"user-photo"} src={user.imageUrl} />
                            </Col>
                            <Col className={"pt-3 pt-md-0 pt-lg-2 pt-xl-3"}>
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
                <div className={"p-0 p-lg-2 p-xl-4"}/>
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

    genresInstrumentsMembersSection = () => {
        const { user, genres, instruments, users } = this.props;

        let genresNames = [];
        let instrumentsNames = [];
        let members = [];

        user.genresId && user.genresId.forEach(genre => genresNames.push(genres[genre]));
        user.instrumentsId && user.instrumentsId.forEach(instr => instrumentsNames.push(instruments[instr]));
        user.members && user.members.forEach(member => {
            members.push({
                name: member.userId ? users.find(elem => elem.id === member.userId).name : member.name,
                path: member.userId ? "/profil/" + member.userId : "",
                buttonText: "Odwiedź profil"
            })
        });

        return (
            <Row className={"justify-content-center"}>
                <Col md={6} className={"text-center mb-2 mb-md-0"}>
                    <h5 className={"mb-3"}>Gatunki</h5>
                    <Blocks elementsList={ genresNames } align={"center"}/>
                </Col>
                { user.isArtist ?
                    <Col md={6} className={"text-center mt-5 mt-md-0"}>
                        <h5 className={"mb-3"}>Instrumenty</h5>
                        <Blocks elementsList={ instrumentsNames } align={"center"}/>
                    </Col>
                    : members.length !== 0 ?
                        <Col md={6} className={"text-center mt-5 mt-md-0"}>
                            <h5 className={"mb-4"}>Członkowie</h5>
                            <BlocksWithButton elementsList={members}/>
                        </Col>
                        : ""
                }
            </Row>
        )
    }

    bandsSection = () => {
        const { user, users } = this.props;
        let bands = [];

        user.bandsId && user.bandsId.forEach(bandId => {
            let band = users.find( elem => elem.id === bandId)
            bands.push({
                name: band.name,
                path: "/profil/" + bandId,
                buttonText: "Odwiedź profil"
            });
        });

        return (
            <Row className={"justify-content-center"}>
                <Col className={"text-center align-self-center"} md={10} lg={8}>
                    <h5 className={"mb-4"}>Zespoły</h5>
                    <BlocksWithButton elementsList={bands}/>
                </Col>
            </Row>
        );
    }

    recordsSection = () => {
        const {profile} = this.props;

        return (
            <Row className={"justify-content-center"}>
                <Col md={8} lg={7} className={"text-center align-self-center"}>
                    <h5 className={"mb-5"}>Nagrania</h5>
                    <div className={"d-flex flex-column"}>
                        { profile.recordings.map((recordingsUrl, index) =>
                            <ReactAudioPlayer key={index} className={"mb-3"} src={recordingsUrl} title={"Sample " + (index + 1)} controls/>
                        )}
                    </div>
                </Col>
            </Row>
        );
    }

    gallerySection = () => {
        const {profile} = this.props;

        return (
            <Row className={"justify-content-center"}>
                <Col className={"text-center align-self-center"}>
                    <h5 className={"mb-5"}>Galeria</h5>
                    <div className={"img-grid"}>
                        { profile.imageGallery.map((imageUrl, index) =>
                            <div className={"img-wrap"} key={index}>
                                <Img src={imageUrl} key={index} alt={"zdjęcie"}/>
                            </div>
                        )}
                    </div>
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

    displayMessageEdit = () => {
        const { modalShow } = this.state;

        return (
            <Modal
                show={modalShow}
                onHide={() => this.setState({modalShow: false})}
                size="md"
                centered>
                <Modal.Header closeButton className={"d-flex flex-row justify-content-center pt-4"}>
                    <h5>Nowa wiadomość</h5>
                </Modal.Header>
                <Modal.Body className={"d-flex flex-row justify-content-center"}>
                    <Form className={"block p-3 d-flex flex-column align-items-center"} onSubmit={this.handleSendMessage}>
                        <Form.Group className={"block mb-4"}>
                            <Form.Control
                                id={"name"}
                                name={"name"}
                                type={"text"}
                                placeholder={"Imię i nazwisko"}
                                defaultValue={this.state.name}
                                size="sm"
                                autoComplete={"off"}
                                maxLength={"100"}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={this.state.errors.name}
                            />
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{this.state.errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"block mb-4"}>
                            <Form.Control
                                id={"email"}
                                name={"email"}
                                type={"email"}
                                placeholder={"Email"}
                                defaultValue={this.state.email}
                                size="sm"
                                autoComplete={"off"}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={this.state.errors.email}
                            />
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{this.state.errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"block mb-5"}>
                            <Form.Control
                                id={"subject"}
                                name={"subject"}
                                type={"text"}
                                placeholder={"Temat"}
                                size="sm"
                                autoComplete={"off"}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={this.state.errors.subject}
                            />
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{this.state.errors.subject}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className={"block mb-5"}>
                            <Form.Control
                                id={"message"}
                                name={"message"}
                                as={"textarea"}
                                rows={5}
                                placeholder={"Wiadomość"}
                                maxLength={"1000"}
                                size="sm"
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={this.state.errors.message}
                            />
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{this.state.errors.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className={"block mb-5 d-none"}>
                            <Form.Control
                                id={"to_name"}
                                name={"to_name"}
                                type={"text"}
                                size="sm"
                                value={this.props.user.name}
                                readOnly
                                hidden
                            />
                        </Form.Group>
                        <Form.Group className={"block mb-5 d-none"}>
                            <Form.Control
                                id={"to_email"}
                                name={"to_email"}
                                type={"text"}
                                size="sm"
                                value={this.props.user.email}
                                readOnly
                                hidden
                            />
                        </Form.Group>

                        <Button variant="outline-accent" size="sm" type={"submit"} className={"px-4"}>Wyślij</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }

    handleSendMessage = (e) => {
        e.preventDefault();
        const { errors } = this.state;

        if (this.evaluateFields(["name", "email", "subject", "message"])){
            if (!Object.keys(errors).some((key) => errors[key])) {
                emailjs.sendForm('gmail', 'users_contact_template', e.target, 'user_W1PcscGeAalQnDU1stttN')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
            }
        }
        e.target.reset();
        this.setState({ modalShow: false });
    }

    handleChange = (e) => {
        const { id, value } = e.target;
        const { errors } = this.state;

        this.setState({
            [id]: value
        })

        if (errors[id]) {
            this.setState({
                errors: {
                    ...errors,
                    [id]: ""
                }
            });
        }
    }

    handleBlur = (e) => {
        this.evaluateFields([e.target.id]);
    }

    evaluateFields = (slugs) => {
        const { errors } = this.state;
        let newErrors = {};

        slugs.forEach(slug => {
            const value = this.state[slug];
            let errorMessage = "";

            if (isEmpty(value)) {
                errorMessage = "* Wymagane pole";
            }
            else {
                switch (slug) {
                    case "email":
                        if (!isEmail(value)) errorMessage = "* Nieprawidłowy adres email"
                        else errorMessage = "";
                        break;
                    default:
                        break;
                }
            }
            newErrors[slug] = errorMessage;
        })

        this.setState({
            errors: {
                ...errors,
                ...newErrors
            }
        })

        return !Object.keys(newErrors).some((key) => errors[key])
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.firestore.data.users && state.firestore.data.users[ownProps.match.params.id],
        users: state.firestore.ordered.users,
        profile: state.firestore.ordered.profiles && state.firestore.ordered.profiles[0],
        auth: state.firebase.auth,
        activeUser: state.firebase.profile,
        status: state.firestore.data.status,
        voivodeships: state.firestore.data.voivodeships,
        genres: state.firestore.data.genres,
        instruments: state.firestore.data.instruments
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {collection: "users"},
        {collection: "profiles", where: ["userId", "==", props.match.params.id]},
        {collection: "status"},
        {collection: "voivodeships"},
        {collection: "genres", orderBy: "name"},
        {collection: "instruments", orderBy: "name"}
    ])
)(UserProfile);