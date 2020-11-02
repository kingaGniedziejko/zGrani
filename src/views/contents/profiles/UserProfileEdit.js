import React, { Component } from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {compose} from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import PersonalDataFormGroup from "./PersonalDataFormGroup";
import ProfileDataFormGroup from "./ProfileDataFormGroup";
import { firestoreConnect } from "react-redux-firebase";
import { editUser } from "../../../store/actions/userActions";

class UserProfileEdit extends Component{
    state = {
        login: '',
        email: '',
        password: '',
        passwordRep: '',
        name: '',
        voivodeship: '',
        city: '',

        genres: this.props.user && this.props.genres && this.props.user.genresId.map( genreId => {
            return {
                id: genreId,
                name: this.props.genres[genreId].name
            }}),

        instruments: this.props.user && this.props.user.isArtist && this.props.instruments && this.props.user.instrumentsId.map( instrumentId => {
            return {
                id: instrumentId,
                name: this.props.instruments[instrumentId].name
            }}),

        members: this.props.user && !this.props.user.isArtist && this.props.users && this.props.user.members.map(member => {
            return member.userId
                ? { name: member.name, user: this.props.users.find(u => u.id === member.userId) }
                : { name: member.name }}),
        newMembers: [],

        status: this.props.user && this.props.status && this.props.instruments && this.props.user.status.map( stat => {
            return (
                stat.instrumentId
                    ? { ...this.props.status[stat.statusId], id: stat.statusId, instrument: {id: stat.instrumentId, name: this.props.instruments[stat.instrumentId].name}}
                    : { ...this.props.status[stat.statusId], id: stat.statusId }
                )}),

        profilePhotoSrcPrev: this.props.user && this.props.user.imageUrl,
        profilePhotoSrc: this.props.user && this.props.user.imageUrl,
        profilePhoto: '',

        profileBackgroundSrcPrev: this.props.profile && this.props.profile.backgroundImageUrl,
        profileBackgroundSrc: this.props.profile && this.props.profile.backgroundImageUrl,
        profileBackground: '',

        description: (this.props.profile && this.props.profile.description) || "",

        recordingsPrev: this.props.profile && this.props.profile.recordings,
        recordings: (this.props.profile && this.props.profile.recordings) || [],

        gallerySrc: (this.props.profile && this.props.profile.imageGallery) || [],
        gallerySrcNew: [],
        galleryNew: [],
        galleryDeleted: [],

        videosPrev: this.props.profile && this.props.profile.videos,
        videos: (this.props.profile && this.props.profile.videos) || [],

        errors: {}
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
            profileBackground, profileBackgroundSrcPrev, profileBackgroundSrc,
            description, gallerySrc, galleryNew, galleryDeleted,
            // recordings,videos, recordingsPrev, videosPrev, errors
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
            imageUrlDeleted: profilePhotoSrcPrev !== profilePhotoSrc ? profilePhotoSrcPrev : ""
        }

        let editedProfile = {
            id: profile && profile.id,
            profileBackground: profileBackground,
            profileBackgroundUrlDeleted: profileBackgroundSrcPrev !== profileBackgroundSrc ? profileBackgroundSrcPrev : "",
            description: description,
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
        const { user, profile, auth } = this.props;
        const { id } = this.props.match.params;

        if (!auth.uid || auth.uid !== id) return <Redirect to={"/logowanie"} />
        if (!user) return "";

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
                                            <PersonalDataFormGroup type={userType.typeSlug} operation={"edit"} user={user} handleUpdate={this.handleUpdate} state={this.state}/>
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
    console.log(state);
    return {
        user: state.firestore.data.users && state.firestore.data.users[ownProps.match.params.id],
        users: state.firestore.ordered.users,
        profile: state.firestore.ordered.profiles && state.firestore.ordered.profiles[0],
        auth: state.firebase.auth,
        status: state.firestore.data.status,
        voivodeships: state.firestore.data.voivodeships,
        genres: state.firestore.data.genres,
        instruments: state.firestore.data.instruments
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
        {collection: "status"},
        {collection: "voivodeships"},
        {collection: "genres", orderBy: "name"},
        {collection: "instruments", orderBy: "name"}
    ])
)(UserProfileEdit);