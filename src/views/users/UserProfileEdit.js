import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { compose } from "redux";
import { connect } from "react-redux";
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

        members: (this.props.user && !this.props.user.isArtist && this.props.usersOrdered && this.props.user.members.map(member => {
            return member.userId
                ? { name: member.name, user: this.props.usersOrdered.find((user) => user.id === member.userId)}
                : { name: member.name }})) || [],
        newMembers: [],
        deletedMembers: [],

        bands: (this.props.user && this.props.user.isArtist && this.props.usersOrdered && this.props.user.bandsId && this.props.user.bandsId.map(bandId => {
            return this.props.usersOrdered.find( elem => elem.id === bandId)
        })) || [],
        deletedBands: [],

        status: (this.props.user && this.props.statusFiltered && this.props.instruments && this.props.user.status.map( stat => {
            return (
                stat.instrumentId
                    ? { ...this.props.statusFiltered[stat.statusId], id: stat.statusId, instrument: {id: stat.instrumentId, name: this.props.instruments[stat.instrumentId].name}}
                    : { ...this.props.statusFiltered[stat.statusId], id: stat.statusId }
                )})) || [],

        profilePhotoSrcPrev: this.props.user && this.props.user.imageUrl,
        profilePhotoSrc: this.props.user && this.props.user.imageUrl,
        profilePhoto: '',

        facebookLink: (this.props.profile && this.props.profile.facebookLink) || "",
        youtubeLink: (this.props.profile && this.props.profile.youtubeLink) || "",
        instagramLink: (this.props.profile && this.props.profile.instagramLink) || "",
        soundcloudLink: (this.props.profile && this.props.profile.soundcloudLink) || "",
        websiteLink: (this.props.profile && this.props.profile.websiteLink) || "",

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
                        if (value.search(/^[a-z0-9-._]+$/) === -1) errorMessage = "* Login może zawierać małe litery, cyfry, oraz znaki: - . _";
                        else {
                            if (this.props.usersOrdered.some(user => user.login === value && user.id !== this.props.auth.uid)) errorMessage = "* Login jest już zajęty";
                            else errorMessage = "";
                        }
                        break;
                    case "email":
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) errorMessage = "* Nieprawidłowy adres email"
                        else {
                            if (this.props.usersOrdered.some(user => user.email === value && user.id !== this.props.auth.uid)) errorMessage = "* Istnieje już konto utworzone na podany adres e-mail";
                            else errorMessage = "";
                        }
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
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { auth, profile } = this.props;
        const { email, newPassword, isNewPasswordSet, login, name, voivodeship, city, genres, instruments, members,
            newMembers, deletedMembers, bands, deletedBands, status, isArtist, profilePhoto, profilePhotoSrcPrev, profilePhotoSrc,
            facebookLink, youtubeLink, instagramLink, soundcloudLink, websiteLink, description, gallerySrc, galleryNew,
            galleryDeleted, recordingsSrc, recordingsNew, recordingsDeleted, videoLink, errors } = this.state;

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
                    bandsId: bands && bands.map(band => band.id),
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

                let updatedDeletedBands = deletedBands.map((band) => {
                    let members = band.members;
                    let updatedMembers = [];
                    console.log(members);

                    Object.keys(members).forEach((key) => {
                        if (members[key].userId){
                            if (members[key].userId !== auth.uid){
                                updatedMembers.push(members[key]);
                            }
                        } else updatedMembers.push(members[key]);
                    })

                    return {
                        id: band.id,
                        updatedMembers: updatedMembers
                    }
                });

                this.clean(editedAuth);
                this.clean(editedUser);
                this.clean(userPhoto);

                console.log(editedAuth);
                console.log(editedUser);
                console.log(userPhoto);
                console.log(editedProfile);

                this.props.editUser(editedAuth, editedUser, userPhoto, newMembers, deletedMembers, updatedDeletedBands, editedProfile);
                this.props.closeModal();
            }
        }
        this.props.scrollToTop();
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
        const { auth, user, profile, users, usersOrdered, usersArtists, statusFiltered, statusFilteredOrdered,
            voivodeships, voivodeshipsOrdered, genres, genresOrdered, instruments, instrumentsOrdered } = this.props;

        if (!auth || !user || !users || !usersOrdered || !usersArtists
            || !statusFiltered || !statusFilteredOrdered || !voivodeships || !voivodeshipsOrdered
            || !genres || !genresOrdered || !instruments || !instrumentsOrdered) return <Loader/>;

        let userType;
        const type1 = { type: "artysta", typeSlug: "artist", title: "Artysta" };
        const type2 = { type: "zespol", typeSlug: "band", title: "Zespół" };

        if (user.isArtist) userType = type1;
        else userType = type2;

        return (
            <div id={"signup-artist"}>
                <Container>
                    <Row className={"section section-card d-flex flex-column align-items-center"}>
                        <Col className={"background-light text-center"} xs={12}>
                            <h3 className={"mb-2"}>Edytowanie Profilu</h3>
                            <h6 className={"mb-5"}>{userType.title}</h6>

                            <Form id={"personal-data-form"} onSubmit={this.handleSubmit} style={{width: "100%"}} className={"d-flex flex-column"}>
                                <Container>
                                    <Row className={"d-flex justify-content-center"}>
                                        <Col xs={12} lg={5} className={"mr-lg-4 p-0 px-sm-2"}>
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
                                        <Col xs={12} lg={5} className={"ml-lg-4 p-0 px-sm-2"}>
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

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (auth, user, userPhoto, newMembers, deletedMembers, updatedDeletedBands, profile) =>
            dispatch(editUser(auth, user, userPhoto, newMembers, deletedMembers, updatedDeletedBands, profile))
    }
}

export default connect(null, mapDispatchToProps)(UserProfileEdit);