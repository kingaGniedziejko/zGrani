import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Container, Col, Row, Form, Button, Image as Img, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import emailjs from 'emailjs-com';
import ReactPlayer from "react-player";
import isEmpty from "validator/es/lib/isEmpty";
import isEmail from "validator/es/lib/isEmail";

import "../../resources/styles/profile_style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { ExclamationCircle } from "react-bootstrap-icons";
import { faFacebook, faYoutube, faInstagram, faSoundcloud } from "@fortawesome/free-brands-svg-icons";

import Blocks from "../layout/displays/Blocks";
import BlocksWithButton from "../layout/displays/BlocksWithButton";
import ErrorPage from "../layout/static_pages/ErrorPage";
import Loader from "../layout/Loader";
import ReactAudioPlayer from "react-audio-player";
import UserProfileEdit from "./UserProfileEdit";

class UserProfile extends Component {
    state = {
        messageModalShow: false,
        editModalShow: false,
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
        const { user, profile, auth, usersOrdered, status, voivodeships, genres, instruments } = this.props;
        const { id } = this.props.match.params;


        if (this.props.auth.uid && !this.props.auth.emailVerified) return <Redirect to={"/potwierdzanie-adresu-email"}/>
        if (user === null) return <ErrorPage/>
        if (user === undefined || !usersOrdered || !status || !voivodeships || !instruments || !genres) return <Loader/>

        let sectionArray = [];

        if (profile && profile.description) sectionArray.push(this.descriptionSection);
        sectionArray.push(this.genresInstrumentsMembersSection);
        if (user.isArtist && user.bandsId && user.bandsId.length !==0) sectionArray.push(this.bandsSection);
        if (profile && profile.recordings && profile.recordings.length !==0 ) sectionArray.push(this.recordsSection);
        if (profile && profile.imageGallery && profile.imageGallery.length !== 0) sectionArray.push(this.gallerySection);
        if (profile && profile.videoLink) sectionArray.push(this.videoSection);

        let isBackgroundLight = false;

        return (
            <div id={"user-profile"} className={"page-content"}>
                {this.userInfoSection(user, profile, auth, id, status, voivodeships, instruments)}

                {sectionArray.map((section, index) => {
                    isBackgroundLight = !isBackgroundLight;
                    return (
                        <div key={ index }
                             className={"section py-5" + (isBackgroundLight? " background-light" : "")}>
                            <Container>
                                { section(isBackgroundLight) }
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
        const renderTooltip = (props) => <Tooltip id="button-tooltip" {...props}>Dodaj więcej informacji o sobie</Tooltip>;

        const button = auth.uid && auth.uid === id ?
            <div className={"d-flex flex-row align-items-center"}>
                <Button
                    variant="outline-accent"
                    size="sm"
                    onClick={() => this.setState({editModalShow: true})}
                >
                    Edytuj profil
                </Button>

                { profile === undefined ?
                    <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                        <ExclamationCircle className={"ml-3"} size={22}/>
                    </OverlayTrigger>
                    : ""
                }
                {this.displayEditModal()}
            </div>
            :
            <div className={"mt-2"}>
                <Button
                    variant="outline-accent"
                    size="sm"
                    onClick={() => {this.setState({
                        messageModalShow:true,
                        name: (this.props.activeUser.isLoaded && this.props.activeUser.isEmpty) || (!this.props.activeUser.isLoaded && this.props.activeUser.isEmpty) ? '' : this.props.activeUser.name,
                        email: this.props.auth && this.props.auth.isLoaded && this.props.auth.isEmpty ? '' : this.props.auth.email
                    })}}>
                    Skontaktuj się
                </Button>
                {this.displayMessageModal()}
            </div>

        const links = (
            <div className={"d-flex flex-row mb-4"}>
                { profile && profile.facebookLink ? <a href={profile.facebookLink} target={"_blank"} rel={"noopener noreferrer"}><FontAwesomeIcon icon={faFacebook} className={"mr-3"}/></a> : ""}
                { profile && profile.youtubeLink ? <a href={profile.youtubeLink} target={"_blank"} rel={"noopener noreferrer"}><FontAwesomeIcon icon={faYoutube} className={"mr-3"}/></a> : ""}
                { profile && profile.instagramLink ? <a href={profile.instagramLink} target={"_blank"} rel={"noopener noreferrer"}><FontAwesomeIcon icon={faInstagram} className={"mr-3"}/></a> : ""}
                { profile && profile.soundcloudLink ? <a href={profile.soundcloudLink} target={"_blank"} rel={"noopener noreferrer"}><FontAwesomeIcon icon={faSoundcloud} className={"mr-3"}/></a> : ""}
                { profile && profile.websiteLink ? <a href={profile.websiteLink} target={"_blank"} rel={"noopener noreferrer"}><FontAwesomeIcon icon={faGlobeAmericas} className={"mr-3"}/></a> : ""}
            </div>
        )

        return (
            <>
                <div className={"section py-4 py-lg-0"} style={{backgroundColor: "var(--background)"}}>
                    <Container className={"user-info"}>
                        <Row>
                            <Col sm={6} md={5} xl={4}>
                                <div className={"img-wrap"}>
                                    <Img src={user.imageUrl} />
                                </div>
                            </Col>
                            <Col className={"pt-3 pt-md-0 pt-lg-2 pt-xl-3 d-flex flex-column"}>
                                <h4 className={""}>{ user.name }</h4>
                                { auth.uid && auth.uid === id ? <p className={"accent-text mb-2"} style={{fontStyle: "italic"}}>{user.login}</p> : ""}
                                <p className={"mb-2 mt-1"}>{ user.isArtist ? "Artysta" : "Zespół" }</p>
                                <div className={"mb-4"}>
                                    <div className={"d-flex flex-row mb-1"}>
                                        <div className={"icon-container mr-2"}>
                                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                                        </div>
                                        <p className={"m-0"}>{ voivodeship + ", " + user.city }</p>
                                    </div>
                                </div>
                                { statusArray ?
                                     <div className={"block mb-1"}>
                                        <Blocks elementsList={ statusArray } align={"start"}/>
                                     </div>
                                    : null
                                }
                                { links }
                                { button }
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={"p-0 p-lg-2 p-xl-4 background-light"}/>
            </>
        );
    }

    descriptionSection = (_) => {
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

    genresInstrumentsMembersSection = (isBgLight) => {
        const { user, genres, instruments, usersOrdered } = this.props;

        let genresNames = [];
        let instrumentsNames = [];
        let members = [];

        user.genresId && user.genresId.forEach(genre => genresNames.push(genres[genre]));
        user.instrumentsId && user.instrumentsId.forEach(instr => instrumentsNames.push(instruments[instr]));
        usersOrdered && user.members && user.members.forEach(member => {
            members.push({
                name: member.userId ? usersOrdered.find(elem => elem.id === member.userId) && usersOrdered.find(elem => elem.id === member.userId).name : member.name,
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
                            <BlocksWithButton elementsList={members} isBgLight={isBgLight}/>
                        </Col>
                        : ""
                }
            </Row>
        )
    }

    bandsSection = (isBgLight) => {
        const { user, usersOrdered } = this.props;
        let bands = [];

        console.log(usersOrdered);

        usersOrdered && user.bandsId && user.bandsId.forEach(bandId => {
            let band = usersOrdered.find( elem => elem.id === bandId)
            bands.push({
                name: band && band.name,
                path: "/profil/" + bandId,
                buttonText: "Odwiedź profil"
            });
        });

        return (
            <Row className={"justify-content-center"}>
                <Col className={"text-center align-self-center"} md={10} lg={8}>
                    <h5 className={"mb-4"}>Zespoły</h5>
                    <BlocksWithButton elementsList={bands} isBgLight={isBgLight}/>
                </Col>
            </Row>
        );
    }

    recordsSection = (_) => {
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

    gallerySection = (_) => {
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

    videoSection = (_) => {
        const {profile} = this.props;

        return (
            <Row id={"video-section"} className={"justify-content-center"}>
                <Col className={"text-center align-self-center d-flex flex-column align-items-center"}>
                    <h5 className={"mb-4"}>Film</h5>
                    <ReactPlayer url={profile && profile.videoLink}/>
                </Col>
            </Row>
        )
    }

    displayEditModal = () => {
        const { editModalShow } = this.state;
        const { auth, user, users, usersOrdered, usersArtists, profile, status, statusOrdered,
            voivodeships, voivodeshipsOrdered, genres, genresOrdered, instruments, instrumentsOrdered } = this.props;

        console.log(this.props);
        return (
            <Modal
                id={"edit-modal"}
                aria-labelledby={"profile-edit"}
                backdropClassName={"profile-edit"}
                show={editModalShow}
                onHide={() => this.setState({editModalShow: false})}
                size="lg"
                centered>
                <Modal.Header closeButton/>
                <Modal.Body>
                    <UserProfileEdit
                        auth={auth}
                        user={user}
                        users={users}
                        usersOrdered={usersOrdered}
                        usersArtists={usersArtists}
                        profile={profile}
                        statusFiltered={status}
                        statusFilteredOrdered={statusOrdered && statusOrdered.filter((s) => s.type === "all" || s.type === (user && user.isArtist ? "artist" : "band"))}
                        voivodeships={voivodeships}
                        voivodeshipsOrdered={voivodeshipsOrdered}
                        genres={genres}
                        genresOrdered={genresOrdered}
                        instruments={instruments}
                        instrumentsOrdered={instrumentsOrdered}
                        closeModal={this.closeEditModal}
                        scrollToTop={this.scrollEditModalToTop}
                    />
                </Modal.Body>
            </Modal>
        );
    }

    closeEditModal = () => {
        this.setState({editModalShow: false})
    }

    scrollEditModalToTop = () => {
        document.getElementsByClassName("modal")[0].scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    displayMessageModal = () => {
        const { messageModalShow } = this.state;

        return (
            <Modal
                show={messageModalShow}
                onHide={() => this.setState({messageModalShow: false})}
                size="md"
                centered>
                <Modal.Header closeButton className={"d-flex flex-row justify-content-center pt-4"}>
                    <h5>Nowa wiadomość</h5>
                </Modal.Header>
                <Modal.Body className={"d-flex flex-row justify-content-center"}>
                    <Form className={"block p-3 d-flex flex-column align-items-center"} onSubmit={this.handleSendMessage}>
                        <Form.Group className={"block mb-4 text-left animated-label"}>
                            <Form.Control
                                id={"name"}
                                name={"name"}
                                type={"text"}
                                className={this.state.name ? "not-empty" : ""}
                                value={this.state.name}
                                size="sm"
                                autoComplete={"off"}
                                maxLength={"100"}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={this.state.errors.name}
                            />
                            <Form.Label>Imię i nazwisko</Form.Label>
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{this.state.errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"block mb-4 mt-2 text-left animated-label"}>
                            <Form.Control
                                id={"email"}
                                name={"email"}
                                type={"email"}
                                className={this.state.email ? "not-empty" : ""}
                                value={this.state.email}
                                size="sm"
                                autoComplete={"off"}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={this.state.errors.email}
                            />
                            <Form.Label>Email</Form.Label>
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{this.state.errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"block mb-5 mt-2 text-left animated-label"}>
                            <Form.Control
                                id={"subject"}
                                name={"subject"}
                                type={"text"}
                                className={this.state.subject ? "not-empty" : ""}
                                size="sm"
                                autoComplete={"off"}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={this.state.errors.subject}
                            />
                            <Form.Label>Temat</Form.Label>
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{this.state.errors.subject}</Form.Control.Feedback>
                        </Form.Group>

                        <h6 className={"mb-3"}>Treść</h6>
                        <Form.Group className={"block mb-5"}>
                            <Form.Control
                                id={"message"}
                                name={"message"}
                                as={"textarea"}
                                rows={5}
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
                e.target.reset();
                this.setState({ messageModalShow: false });
            }
        }
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

        return !Object.keys(newErrors).some((key) => newErrors[key])
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.firebase.auth,
        activeUser: state.firebase.profile,

        user: state.firestore.data.allUsers && state.firestore.data.allUsers[ownProps.match.params.id],
        users: state.firestore.data.allUsers,
        usersOrdered: state.firestore.ordered.allUsers,
        usersArtists: state.firestore.ordered.allUsers && state.firestore.ordered.allUsers.filter(user => user.isArtist),
        profile: state.firestore.ordered.profiles && state.firestore.ordered.profiles[0],

        status: state.firestore.data.status,
        statusOrdered: state.firestore.ordered.status,

        voivodeships: state.firestore.data.voivodeships,
        voivodeshipsOrdered: state.firestore.ordered.voivodeships,

        genres: state.firestore.data.genres,
        genresOrdered: state.firestore.ordered.genres,

        instruments: state.firestore.data.instruments,
        instrumentsOrdered: state.firestore.ordered.instruments
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {collection: "users", storeAs: "allUsers"},
        {collection: "profiles", where: ["userId", "==", props.match.params.id]},
        {collection: "status"},
        {collection: "voivodeships"},
        {collection: "genres", orderBy: "name"},
        {collection: "instruments", orderBy: "name"}
    ])
)(UserProfile);