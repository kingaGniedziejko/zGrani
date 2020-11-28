import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import isEmpty from "validator/es/lib/isEmpty";
import equals from "validator/es/lib/equals";

import { editUser } from "../../store/actions/userActions";

import PersonalDataFormGroup from "../layout/forms/PersonalDataFormGroup";
import ProfileDataFormGroup from "../layout/forms/ProfileDataFormGroup";
import Loader from "../layout/Loader";

class UserProfileEdit extends Component{
    state = {
        isLoaded: false,

        login: (this.props.user && this.props.user.login) || '',
        email: (this.props.auth && this.props.auth.email) || '',

        actualPassword: '',
        newPassword: '',
        newPasswordRep: '',
        isNewPasswordSet: false,

        name: (this.props.user && this.props.user.name) || '',
        voivodeship: (this.props.user && this.props.user.voivodeshipId &&
            {
                id: this.props.user.voivodeshipId,
                name: this.props.voivodeships[this.props.user.voivodeshipId].name
            }) || '',
        city: (this.props.user && this.props.user.city) || '',

        genres: (this.props.user && this.props.genres && this.props.user.genresId.map( genreId => {
            return {
                id: genreId,
                name: this.props.genres[genreId].name
            }})) || [],

        instruments: (this.props.user && this.props.user.isArtist && this.props.instruments && this.props.user.instrumentsId.map( instrumentId => {
            return {
                id: instrumentId,
                name: this.props.instruments[instrumentId].name
            }})) || [],

        members: (this.props.user && !this.props.user.isArtist && this.props.users && this.props.user.members.map(member => {
            return member.userId
                ? { name: member.name, user: this.props.users[member.userId] }
                    // ? { name: member.name, user: this.props.users.find(u => u.id === member.userId) }
                : { name: member.name }})) || [],
        newMembers: [],

        status: (this.props.user && this.props.statusFiltered && this.props.instruments && this.props.user.status.map( stat => {
            return (
                stat.instrumentId
                    ? { ...this.props.statusFiltered[stat.statusId], id: stat.statusId, instrument: {id: stat.instrumentId, name: this.props.instruments[stat.instrumentId].name}}
                    : { ...this.props.statusFiltered[stat.statusId], id: stat.statusId }
                )})) || [],

        profilePhotoSrcPrev: this.props.user && this.props.user.imageUrl,
        profilePhotoSrc: this.props.user && this.props.user.imageUrl,
        profilePhoto: '',

        // profileBackgroundSrcPrev: this.props.profile && this.props.profile.backgroundImageUrl,
        // profileBackgroundSrc: this.props.profile && this.props.profile.backgroundImageUrl,
        // profileBackground: '',

        facebookLink: (this.props.profile && this.props.profile.facebookLink) || "",
        youtubeLink: (this.props.profile && this.props.profile.facebookLink) || "",
        instagramLink: (this.props.profile && this.props.profile.facebookLink) || "",
        soundcloudLink: (this.props.profile && this.props.profile.facebookLink) || "",
        websiteLink: (this.props.profile && this.props.profile.facebookLink) || "",

        description: (this.props.profile && this.props.profile.description) || "",

        recordingsSrc: (this.props.profile && this.props.profile.recordings) || [],
        recordingsSrcNew: [],
        recordingsNew: [],
        recordingsDeleted: [],

        gallerySrc: (this.props.profile && this.props.profile.imageGallery) || [],
        gallerySrcNew: [],
        galleryNew: [],
        galleryDeleted: [],

        videoLink: (this.props.profile && this.props.profile.videoLink) || "",

        errors: {}
    }

    static getDerivedStateFromProps(props, prevState) {
        if (!prevState.isLoaded) {
            let isLoaded = false;
            if (props.auth && props.user && props.genres && props.instruments && props.users && props.statusFiltered) isLoaded = true;

            return {
                ...prevState,

                login: (props.user && props.user.login) || '',
                email: (props.auth && props.auth.email) || '',
                name: (props.user && props.user.name) || '',
                voivodeship: (props.user && props.voivodeships && props.user.voivodeshipId &&
                    {
                        id: props.user.voivodeshipId,
                        name: props.voivodeships[props.user.voivodeshipId].name
                    }) || '',
                city: (props.user && props.user.city) || '',

                profilePhotoSrcPrev: props.user && props.user.imageUrl,
                profilePhotoSrc: props.user && (prevState.profilePhotoSrc && prevState.profilePhotoSrc !== props.user.imageUrl
                    ? prevState.profilePhotoSrc : props.user.imageUrl),

                genres: (props.user && props.genres && props.user.genresId.map( genreId => {
                    return {
                        id: genreId,
                        name: props.genres[genreId].name
                    }})) || [],

                instruments: (props.user && props.user.isArtist && props.instruments && props.user.instrumentsId.map( instrumentId => {
                    return {
                        id: instrumentId,
                        name: props.instruments[instrumentId].name
                    }})) || [],

                members: (props.user && !props.user.isArtist && props.users && props.user.members.map(member => {
                    return member.userId
                        ? { name: member.name, user: props.users[member.userId] }
                        : { name: member.name }})) || [],

                status: (props.user && props.statusFiltered && props.instruments && props.user.status.map( stat => {
                    return (
                        stat.instrumentId
                            ? { ...props.statusFiltered[stat.statusId], id: stat.statusId, instrument: {id: stat.instrumentId, name: props.instruments[stat.instrumentId].name}}
                            : { ...props.statusFiltered[stat.statusId], id: stat.statusId }
                    )})) || [],

                facebookLink: (props.profile && props.profile.facebookLink) || "",
                youtubeLink: (props.profile && props.profile.facebookLink) || "",
                instagramLink: (props.profile && props.profile.facebookLink) || "",
                soundcloudLink: (props.profile && props.profile.facebookLink) || "",
                websiteLink: (props.profile && props.profile.facebookLink) || "",

                description: (props.profile && props.profile.description) || "",
                recordingsSrc: (props.profile && props.profile.recordings) || [],
                gallerySrc: (props.profile && props.profile.imageGallery) || [],

                videoLink: (props.profile && props.profile.videoLink) || "",

                isLoaded: isLoaded
            }
        } else {
            return {...prevState};
        }
    }

    evaluateFields = (slugs) => {
        const { errors } = this.state;
        let newErrors = {};

        slugs.forEach(slug => {
            const value = this.state[slug];
            let errorMessage = "";

            if (value === "" || value === undefined) errorMessage = "* Wymagane pole";
            else {
                switch (slug) {
                    case "login":
                        if (value.search(/^[a-zA-Z0-9-._]+$/) === -1) errorMessage = "* Login może zawierać litery, cyfry, oraz znaki: - . _ ";
                        else {
                            if (this.props.usersOrdered.some(user => user.login === value && user.id !== this.props.auth.uid)) errorMessage = "* Login jest już zajęty";
                            else errorMessage = "";
                        }
                        break;
                    case "email":
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) errorMessage = "* Nieprawidłowy adres email"
                        else errorMessage = "";
                        break;
                    case "password":
                    case "newPassword":
                        if (value.length < 6) errorMessage = "* Hasło musi posiadać conajmniej 6 znaków";
                        else errorMessage = "";
                        break;
                    case "passwordRep":
                        if (!equals(value, this.state.password)) errorMessage = "* Hasła muszą być takie same"
                        else errorMessage = "";
                        break;
                    case "newPasswordRep":
                        if (!equals(value, this.state.newPassword)) errorMessage = "* Hasła muszą być takie same"
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

    handleUpdate = (slug, value) => {
        this.setState({ [slug]: value });
        console.log(this.state);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { auth, profile } = this.props;
        const { email, newPassword, isNewPasswordSet,
            login, name, voivodeship, city, genres, instruments, members, newMembers, status, isArtist,
            profilePhoto, profilePhotoSrcPrev, profilePhotoSrc,
            facebookLink, youtubeLink, instagramLink, soundcloudLink, websiteLink,
            description,
            gallerySrc, galleryNew, galleryDeleted,
            recordingsSrc, recordingsNew, recordingsDeleted,
            videoLink,
            errors
        } = this.state;

        console.log(this.state);

        if (this.evaluateFields(["login", "email", "name", "voivodeship", "city"])) {
            if (!Object.keys(errors).some((key) => errors[key])) {

                let editedAuth = {
                    id: auth.uid,
                    email: email,
                    password: isNewPasswordSet ? newPassword : "",
                    hasProfile: profile !== undefined
                }

                let editedUser = {
                    login: login,
                    email: email,
                    name: name,
                    voivodeshipId: voivodeship.id,
                    city: city,
                    genresId: genres && genres.map(genre => genre.id),
                    instrumentsId: instruments && instruments.map(instrument => instrument.id),
                    members: members && members.map(member => (member.user ? {
                        name: member.name,
                        userId: member.user.id
                    } : {name: member.name})),
                    status: status && status.map(stat => (stat.withInstrument ? {
                        instrumentId: stat.instrument.id,
                        statusId: stat.id
                    } : {statusId: stat.id})),
                    isArtist: isArtist
                }

                let userPhoto = {
                    image: profilePhoto,
                    imageUrlDeleted: profilePhotoSrcPrev !== profilePhotoSrc ? profilePhotoSrcPrev : "",
                    defaultImage: profilePhotoSrc === undefined && profilePhoto === undefined
                }

                let editedProfile = {
                    id: profile && profile.id,

                    facebookLink: facebookLink,
                    youtubeLink: youtubeLink,
                    instagramLink: instagramLink,
                    soundcloudLink: soundcloudLink,
                    websiteLink: websiteLink,

                    description: description,

                    recordingsSrc: recordingsSrc,
                    recordingsNew: recordingsNew,
                    recordingsDeleted: recordingsDeleted,

                    gallerySrc: gallerySrc,
                    galleryNew: galleryNew,
                    galleryDeleted: galleryDeleted,

                    videoLink: videoLink
                }

                this.clean(editedAuth);
                this.clean(editedUser);
                this.clean(userPhoto);

                console.log(editedAuth);
                console.log(editedUser);
                console.log(userPhoto);
                console.log(editedProfile);

                this.props.editUser(editedAuth, editedUser, userPhoto, newMembers, editedProfile);

                this.props.history.push("/profil/" + auth.uid);
            }
        }

        this.scrollToTop();
    }

    clean = (obj) => {
        let propNames = Object.getOwnPropertyNames(obj);
        for (let i = 0; i < propNames.length; i++) {
            let propName = propNames[i];
            if (!obj[propName] || obj[propName] === Array(0)) {
                delete obj[propName];
            }
        }
        return obj;
    }

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    render() {
        const { auth, user, profile,
            users, usersOrdered, usersArtists,
            statusFiltered, statusFilteredOrdered,
            voivodeships, voivodeshipsOrdered,
            genres, genresOrdered,
            instruments, instrumentsOrdered } = this.props;
        const { id } = this.props.match.params;

        console.log(this.props);

        if (this.props.auth.uid && !this.props.auth.emailVerified) return <Redirect to={"/potwierdzanie-adresu-email"}/>
        if (!auth.uid || auth.uid !== id) return <Redirect to={"/logowanie"} />
        if (!auth || !user || !users || !usersOrdered || !usersArtists
            || !statusFiltered || !statusFilteredOrdered || !voivodeships || !voivodeshipsOrdered
            || !genres || !genresOrdered || !instruments || !instrumentsOrdered) return <Loader/>;



        let userType;
        const type1 = {
            type: "artysta",
            typeSlug: "artist",
            title: "Artysta"
        }
        const type2 = {
            type: "zespol",
            typeSlug: "band",
            title: "Zespół"
        }

        if (user.isArtist) userType = type1;
        else userType = type2;

        return (
            <div id={"signup-artist"} className={"page-content"}>
                <Container>
                    <Row className={"section section-card d-flex flex-column align-items-center"}>
                        <Col className={"background-light p-3 p-sm-5 my-2 my-sm-5 text-center"} xs={11}>
                            <h3 className={"mb-2"}>Edytowanie Profilu</h3>
                            <h6 className={"mb-5"}>{userType.title}</h6>

                            <Form id={"personal-data-form"} onSubmit={this.handleSubmit} style={{width: "100%"}} className={"d-flex flex-column"}>
                                <Container>
                                    <Row className={"d-flex justify-content-center"}>
                                        <Col xs={11} lg={5} className={"mr-2"}>
                                            <h5 className={"mt-2 mb-5"}>Podstawowe dane</h5>
                                            <PersonalDataFormGroup
                                                type={userType.typeSlug}
                                                operation={"edit"}
                                                data={{
                                                    auth: auth,
                                                    user: user,
                                                    usersOrdered: usersOrdered,
                                                    usersArtists: usersArtists,
                                                    statusFilteredOrdered: statusFilteredOrdered,
                                                    voivodeships: voivodeships,
                                                    voivodeshipsOrdered: voivodeshipsOrdered,
                                                    genresOrdered: genresOrdered,
                                                    instrumentsOrdered: instrumentsOrdered,
                                                }}
                                                evaluateFields={this.evaluateFields}
                                                handleUpdate={this.handleUpdate}
                                                state={this.state}/>
                                        </Col>
                                        <Col xs={11} lg={5} className={"ml-2"}>
                                            <h5 className={"mt-2 mb-5"}>Dodatkowe dane</h5>
                                            <ProfileDataFormGroup user={user} profile={profile} handleUpdate={this.handleUpdate} state={this.state}/>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <Col xs={10} lg={6} xl={5}>
                                            <Button block type="submit" variant="outline-accent" size="sm" className={"mb-3"}>Zapisz</Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.firebase.auth,
        user: state.firestore.data.users && state.firestore.data.users[ownProps.match.params.id],
        profile: state.firestore.ordered.profiles && state.firestore.ordered.profiles[0],

        users: state.firestore.data.users,
        usersOrdered: state.firestore.ordered.users,
        usersArtists: state.firestore.ordered.users && state.firestore.ordered.users.filter(user => user.isArtist),

        statusFiltered: state.firestore.data.statusFiltered,
        statusFilteredOrdered: state.firestore.ordered.statusFiltered,

        voivodeships: state.firestore.data.voivodeships,
        voivodeshipsOrdered: state.firestore.ordered.voivodeships,

        genres: state.firestore.data.genres,
        genresOrdered: state.firestore.ordered.genres,

        instruments: state.firestore.data.instruments,
        instrumentsOrdered: state.firestore.ordered.instruments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (auth, user, userPhoto, newMembers, profile) => dispatch(editUser(auth, user, userPhoto, newMembers, profile))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: "users"},
        {collection: "status", where: ["type", "in", [props.user && props.user.isArtist ? "artist" : "band", "all"]], storeAs: "statusFiltered"},
        {collection: "voivodeships", orderBy: "name"},
        {collection: "genres", orderBy: "name"},
        {collection: "instruments", orderBy: "name"}
    ]),
    withRouter
)(UserProfileEdit);