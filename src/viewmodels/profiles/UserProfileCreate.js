import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"

import { signup } from "../../store/actions/authActions";

import PersonalDataFormGroup from "../../views/forms/PersonalDataFormGroup";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import Loader from "../../views/Loader";

class UserProfileCreate extends Component{
    state = {
        login: '',
        email: '',
        password: '',
        passwordRep: '',
        name: '',
        voivodeship: '',
        city: '',

        genres: [],
        instruments: [],
        members: [],
        status: [],

        agreement: false,
        isArtist: this.props.match.params.type === "artysta",

        errors: {}
    }

    handleUpdate = (slug, item) => {
        this.setState({ [slug]: item })

        console.log(this.state);
    }

    handleChange = (e) => {
        if (e.target.type === "checkbox") {
            if (this.state.errors.agreement){
                this.setState({
                    [e.target.id]: e.target.checked,
                    errors: {...this.state.errors, agreement: ""}
                })
            } else {
                this.setState({
                    [e.target.id]: e.target.checked
                })
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { login, email, password, name, voivodeship, city, genres, instruments, members, status, isArtist, errors, agreement } = this.state;

        console.log(this.state);

        if (!agreement){
            this.setState({"errors": { ...errors, agreement: "* Wymagana zgoda" }});
        } else {
            if (!Object.keys(errors).some((key) => errors[key])) {
                // walidacja statusu, czy z instrumentem

                let newUser = {
                    login: login,
                    email: email,
                    password: password,
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
                console.log(newUser);
                this.props.signup(newUser);
            }
        }
    }

    render() {
        const { auth, authError, usersArtists, statusFilteredOrdered, voivodeshipsOrdered, genresOrdered, instrumentsOrdered } = this.props;

        if (auth.uid) return <Redirect to={"/"} />;
        if (!auth || !usersArtists || !statusFilteredOrdered || !voivodeshipsOrdered || !genresOrdered || !instrumentsOrdered) return <Loader/>;

        console.log(this.state.isArtist);

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

        const { type } = this.props.match.params;

        if (type === type1.type) userType = type1;
        else if (type === type2.type) userType = type2;
        else return "404";

        return (
            <div id={"signup-artist"} className={"page-content"}>
                <Container>
                    <Row className={"section section-card d-flex flex-column align-items-center"}>
                        <Col className={"background-light p-3 p-sm-5 my-2 my-sm-5 text-center"} xs={11} sm={10} md={8} lg={5}>
                            <h3 className={"mb-2"}>Rejestracja</h3>
                            <h6 className={"mb-2"}>{userType.title}</h6>

                            { authError ? <p className={"error"}>{authError}</p> : null}

                            <Form id={"personal-data-form"} className={"mt-5 d-flex flex-column"} onSubmit={this.handleSubmit} style={{width: "100%"}}>
                                <PersonalDataFormGroup
                                    type={userType.typeSlug}
                                    operation={"create"}
                                    data={{
                                        auth: auth,
                                        // user: user,
                                        // usersOrdered: usersOrdered,
                                        usersArtists: usersArtists,
                                        statusFilteredOrdered: statusFilteredOrdered,
                                        // voivodeships: voivodeships,
                                        voivodeshipsOrdered: voivodeshipsOrdered,
                                        genresOrdered: genresOrdered,
                                        instrumentsOrdered: instrumentsOrdered,
                                    }}
                                    handleUpdate={this.handleUpdate}
                                    state={this.state}/>
                                <Form.Group className={"block mb-2"}>
                                    <>
                                        <Form.Check
                                            id={"agreement"}
                                            type={"checkbox"}
                                            custom
                                            className={"align-self-start mb-2 d-flex flex-row align-items-center"}
                                            label={
                                                <p style={{paddingTop: "2px"}}>
                                                    Akceptuję&nbsp;
                                                    <Link to="/regulamin" className={"underline"}>regulamin</Link>
                                                </p> }
                                            onChange={this.handleChange}
                                            isInvalid={this.state.errors.agreement}
                                        />
                                    </>
                                    {/*<Form.Control.Feedback type="invalid" className={"text-left"}>{this.state.errors.agreement}</Form.Control.Feedback>*/}
                                </Form.Group>
                                <Button block type="submit" variant="outline-accent" size="sm" className={"mb-3"}>Załóż konto</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,

        usersArtists: state.firestore.ordered.users && state.firestore.ordered.users.filter(user => user.isArtist),
        statusFilteredOrdered: state.firestore.ordered.statusFiltered,
        voivodeshipsOrdered: state.firestore.ordered.voivodeships,
        genresOrdered: state.firestore.ordered.genres,
        instrumentsOrdered: state.firestore.ordered.instruments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (newUser) => dispatch(signup(newUser))
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
    ])
)(UserProfileCreate);