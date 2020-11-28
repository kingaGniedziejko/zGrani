import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import equals from "validator/es/lib/equals";

import { signup } from "../../store/actions/authActions";

import PersonalDataFormGroup from "../layout/forms/PersonalDataFormGroup";
import Loader from "../layout/Loader";

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

    evaluateFields = (slugs) => {
        const { errors, isArtist } = this.state;
        let newErrors = {};

        slugs.forEach(slug => {
            const value = this.state[slug];
            let errorMessage = "";

            if (["login", "email", "password", "passwordRep", "name", "city", "voivodeship"].some(field => field === slug)
                    && (value === "" || value === undefined))
                errorMessage = "* Wymagane pole";
            else if (slug === "genres" && ((value && value.length === 0) || value === undefined))
                errorMessage = "* Należy wybrać minimum jedną wartość";
            else if (isArtist && slug === "instruments" && ((value && value.length === 0) || value === undefined))
                errorMessage = "* Należy wybrać minimum jedną wartość";
            else if (slug === "agreement" && !value)
                errorMessage = "* Wymagana zgoda";
            else {
                switch (slug) {
                    case "login":
                        if (value.search(/^[a-zA-Z0-9-._]+$/) === -1) errorMessage = "* Login może zawierać litery, cyfry, oraz znaki: - . _ ";
                        else {
                            if (this.props.usersOrdered.some(user => user.login === value)) errorMessage = "* Login jest już zajęty";
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

    handleSubmit = (e) => {
        e.preventDefault();
        const { login, email, password, name, voivodeship, city, genres, instruments, members, status, isArtist, errors } = this.state;

        console.log(this.state);

        if (this.evaluateFields(["login", "email", "password", "passwordRep", "name", "voivodeship", "city", "genres", "instruments", "agreement"])){
            if (!Object.keys(errors).some((key) => errors[key])) {
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

        this.scrollToTop();
    }

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
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
                                    evaluateFields={this.evaluateFields}
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

        usersOrdered: state.firestore.ordered.users,
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
        {collection: "status", where: ["type", "in", [props.match.params.type === "artysta" ? "artist" : "band", "all"]], storeAs: "statusFiltered"},
        {collection: "voivodeships", orderBy: "name"},
        {collection: "genres", orderBy: "name"},
        {collection: "instruments", orderBy: "name"}
    ])
)(UserProfileCreate);