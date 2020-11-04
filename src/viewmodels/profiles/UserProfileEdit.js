import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import PersonalDataFormGroup from "../../views/forms/PersonalDataFormGroup";
import ProfileDataFormGroup from "../../views/forms/ProfileDataFormGroup";
import { firestoreConnect } from "react-redux-firebase";
import { editUser } from "../../store/actions/userActions";
import Loader from "../../views/Loader";

class UserProfileEdit extends Component{
    state = {
        isLoaded: false,

        login: '',
        email: '',
        password: '',
        passwordRep: '',
        name: '',
        voivodeship: '',
        city: '',

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

        description: (this.props.profile && this.props.profile.description) || "",

        recordingsSrc: (this.props.profile && this.props.profile.recordings) || [],
        recordingsSrcNew: [],
        recordingsNew: [],
        recordingsDeleted: [],

        gallerySrc: (this.props.profile && this.props.profile.imageGallery) || [],
        gallerySrcNew: [],
        galleryNew: [],
        galleryDeleted: [],

        videosPrev: this.props.profile && this.props.profile.videos,
        videos: (this.props.profile && this.props.profile.videos) || [],

        errors: {}
    }

    static getDerivedStateFromProps(props, prevState) {


        if (!prevState.isLoaded) {
            let isLoaded = false;
            if (props.user && props.genres && props.instruments && props.users && props.statusFiltered && props.profile) isLoaded = true;

            return {
                ...prevState,

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

                description: (props.profile && props.profile.description) || "",
                recordingsSrc: (props.profile && props.profile.recordings) || [],
                gallerySrc: (props.profile && props.profile.imageGallery) || [],

                isLoaded: isLoaded
            }
        } else {
            return {...prevState};
        }
    }

    handleUpdate = (slug, value) => {
        this.setState({ [slug]: value });
        console.log(this.state);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { auth, profile } = this.props;
        const { email, password,
            login, name, voivodeship, city, genres, instruments, members, newMembers, status, isArtist,
            profilePhoto, profilePhotoSrcPrev, profilePhotoSrc,
            // profileBackground, profileBackgroundSrcPrev, profileBackgroundSrc,
            description, gallerySrc, galleryNew, galleryDeleted,
            recordingsSrc, recordingsNew, recordingsDeleted,
            // videos, videosPrev, errors
        } = this.state;

        let editedAuth = {
            id: auth.uid,
            email: email,
            password: password,
            hasProfile: profile
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

            // profileBackground: profileBackground,
            // profileBackgroundUrlDeleted: profileBackgroundSrcPrev !== profileBackgroundSrc ? profileBackgroundSrcPrev : "",

            description: description,

            recordingsSrc: recordingsSrc,
            recordingsNew: recordingsNew,
            recordingsDeleted: recordingsDeleted,

            gallerySrc: gallerySrc,
            galleryNew: galleryNew,
            galleryDeleted: galleryDeleted
        }

        this.clean(editedAuth);
        this.clean(editedUser);
        this.clean(userPhoto);

        console.log(editedAuth);
        console.log(editedUser);
        console.log(userPhoto);
        console.log(editedProfile);

        this.props.editUser(editedAuth, editedUser, userPhoto, newMembers, editedProfile);
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

    render() {
        const { auth, user, profile,
            users, usersOrdered, usersArtists,
            statusFiltered, statusFilteredOrdered,
            voivodeships, voivodeshipsOrdered,
            genres, genresOrdered,
            instruments, instrumentsOrdered } = this.props;
        const { id } = this.props.match.params;

        console.log(id);
        console.log(this.props);

        if (!auth.uid || auth.uid !== id) return <Redirect to={"/logowanie"} />
        if (!auth || !user || !profile || !users || !usersOrdered || !usersArtists
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
        {collection: "profiles", where: ["userId", "==", props.match.params.id]},
        {collection: "status", where: ["type", "in", [props.user && props.user.isArtist ? "artist" : "band", "all"]], storeAs: "statusFiltered"},
        {collection: "voivodeships", orderBy: "name"},
        {collection: "genres", orderBy: "name"},
        {collection: "instruments", orderBy: "name"}
    ])
)(UserProfileEdit);