import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../../store/actions/authActions";
import isEmail from "validator/es/lib/isEmail";
import isEmpty from "validator/es/lib/isEmpty";

class Login extends Component{
    state = {
        email: "",
        password: "",
        errors: {},
    }

    handleBlur = (e) => {
        const { id, value } = e.target;
        const { errors } = this.state;
        let errorMessage = "";

        switch (id) {
            case "email":
                if (isEmpty(value)) errorMessage = "* Wymagane pole"
                else {
                    if (!isEmail(value)) errorMessage = "* Nieprawidłowy adres email"
                    else errorMessage = "";
                }
                break;
            case "password":
                if (isEmpty(value)) errorMessage = "* Wymagane pole"
                else if (value.length < 6) errorMessage = "* Hasło musi posiadać conajmniej 6 znaków"
                else errorMessage = ""
                break;
            default:
                break;
        }
        this.setState({ errors: {
            ...errors,
            [id]: errorMessage
        }});
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

        if (this.state.errors[e.target.id]) {
            // this.handleBlur(e);
            this.setState({
                errors: {
                    ...this.state.errors,
                    [e.target.id]: ""
                }
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { errors } = this.state;

        if (!Object.keys(errors).some((key) => errors[key])){
            this.props.signIn(this.state);
        }
    }

    render() {
        const { auth, authError } = this.props;

        if (auth.uid) return <Redirect to={"/"} />;

        return (
            <div id={"login"} className={"page-content d-flex justify-content-center"}>
                <Container>
                    <Row className={"section section-card d-flex flex-column align-items-center"}>
                        <Col className={"background-light p-5 my-2 my-sm-5 text-center"} xs={11} sm={8} md={7} lg={4}>
                            <h3 className={"mb-2"}>Logowanie</h3>
                            { authError ? <p className={"error"}>{authError}</p> : null}
                            <Form onSubmit={this.handleSubmit} className={"mt-5 d-flex flex-column align-items-center"} style={{width: "100%"}}>
                                <Form.Group className={"block mb-4"}>
                                    <Form.Control
                                        id={"email"}
                                        type={"email"}
                                        placeholder={"Email"}
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
                                        id={"password"}
                                        type={"password"}
                                        placeholder={"Hasło"}
                                        size="sm"
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        isInvalid={this.state.errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid" className={"text-left"}>{this.state.errors.password}</Form.Control.Feedback>
                                </Form.Group>

                                <Button block type="submit" variant="outline-accent" size="sm" className={"mb-3"}>Zaloguj się</Button>
                                <p className={"mb-3"}>lub</p>
                                <Link to={"/rejestracja"} className={"d-block"} style={{width: "100%"}}>
                                    <Button block variant="outline-white" size="sm">Załóż konto</Button>
                                </Link>

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
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(login(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);