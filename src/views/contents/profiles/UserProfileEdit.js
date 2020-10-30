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
        instruments: [],
        // instruments: this.props.user && this.props.user.isArtist && this.props.instruments && this.props.user.instrumentsId.map( instrumentId => {
        //     return { id: instrumentId, name: this.props.instruments[instrumentId].name }}),
        members: this.props.user && !this.props.user.isArtist && this.props.users && this.props.user.members.map(member => {
            return member.userId ? { name: member.name, user: this.props.users[member.userId] } : { name: member.name }}),
        status: this.props.user && this.props.status && this.props.instruments && this.props.user.status.map( stat => {
            return (
                stat.instrumentId
                    ? { ...this.props.status[stat.statusId], id: stat.statusId, instrument: {id: stat.instrumentId, name: this.props.instruments[stat.instrumentId].name}}
                    : { ...this.props.status[stat.statusId], id: stat.statusId }
                )}),

        errors: {}
    }

    handleUpdate = (slug, value) => {
        this.setState({ [slug]: value })
    }

    // handleChange = (e) => {
    //     if (e.target.type === "checkbox") {
    //         this.setState({
    //             [e.target.id]: e.target.checked
    //         })
    //     }
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        const { auth } = this.props;
        const { login, email, password, name, voivodeship, city, genres, instruments, members, status, isArtist, errors, agreement } = this.state;

        console.log(this.state);

        let editedAuth = {
            id: auth.uid,
            email: email,
            password: password
        }

        let editedUser = {
            login: login,
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

        let editedProfile = {}

        this.clean(editedUser);
        console.log(editedUser);

        this.props.editUser(editedAuth, editedUser, editedProfile);
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

    // componentDidMount() {
    //
    //     if (user && status && voivodeships && genres && instruments) {
    //         this.setState({
    //             genres: user.genresId.map( genreId => genres[genreId])
    //         })
    //     }
    // }

    render() {
        const { status, voivodeships, genres, instruments } = this.props
        const { user, auth } = this.props;
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
        //
        // if (user && status && voivodeships && genres && instruments) {
        //     this.setState({
        //         genres: user.genresId.map( genreId => genres[genreId])
        //     })
        // }

        if (this.props.user) {
            console.log(this.props.genres);
            console.log(this.props.user.genresId);
            console.log(this.state.genres);
        }
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
                                            <ProfileDataFormGroup type={userType.typeSlug} operation={"edit"} />
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
        users: state.firestore.data.users,
        auth: state.firebase.auth,
        status: state.firestore.data.status,
        voivodeships: state.firestore.data.voivodeships,
        genres: state.firestore.data.genres,
        instruments: state.firestore.data.instruments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (auth, user, profile) => dispatch(editUser(auth, user, profile))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: "users"},
        {collection: "status"},
        {collection: "voivodeships"},
        {collection: "genres", orderBy: "name"},
        {collection: "instruments", orderBy: "name"}
    ])
)(UserProfileEdit);