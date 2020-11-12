import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { forgotPassword } from "../../store/actions/authActions";
import isEmail from "validator/es/lib/isEmail";
import isEmpty from "validator/es/lib/isEmpty";

class ForgotPassword extends Component{
    state = {
        email: "",
        errors: {},
        loading: this.props.forgotPasswordError === null
    }

    evaluateFields = (slugs) => {
        const {errors} = this.state;
        let newErrors = {};

        slugs.forEach(slug => {
            const value = this.state[slug];
            let errorMessage = "";

            switch (slug) {
                case "email":
                    if (isEmpty(value)) errorMessage = "* Wymagane pole"
                    else {
                        if (!isEmail(value)) errorMessage = "* Nieprawidłowy adres email"
                        else errorMessage = "";
                    }
                    break;
                default:
                    break;
            }
            newErrors[slug] = errorMessage;
        })
        this.setState({
            errors: {
                ...errors,
                ...newErrors
            }
        })

        console.log(newErrors);

        return !Object.keys(newErrors).some((key) => newErrors[key])
    }

    handleBlur = (e) => {
        this.evaluateFields([e.target.id]);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

        if (this.state.errors[e.target.id]) {
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
        console.log(this.evaluateFields(["email"]));

        if (this.evaluateFields(["email"])) {
            if (!Object.keys(errors).some((key) => errors[key])) {
                this.props.forgotPassword(this.state.email);
            }
        }
    }

    render() {
        const { auth, forgotPasswordError, forgotPasswordAwaitMessage } = this.props;
        const { loading } = this.state;

        if (auth.uid) return <Redirect to={"/"} />;

        return (
            <div id={"forgot-password"} className={"page-content d-flex justify-content-center"}>
                <Container>
                    <Row className={"section section-card d-flex flex-column align-items-center"}>
                        <Col className={"background-light p-5 my-2 my-sm-5 text-center"} xs={11} sm={8} md={7} lg={4}>
                            <h3 className={"mb-2"}>Zapomniałem/-am hasła</h3>
                            { forgotPasswordError ? <p className={"error"}>{forgotPasswordError}</p> : null}

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

                                { forgotPasswordAwaitMessage ?
                                    <p>{forgotPasswordAwaitMessage}</p>
                                    :
                                    <Button block type="submit" variant="outline-accent" size="sm" className={"mb-3"}>Dalej</Button>
                                }
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
        forgotPasswordError: state.auth.forgotPasswordError || "",
        forgotPasswordAwaitMessage: state.auth.forgotPasswordAwaitMessage || ""
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email) => dispatch(forgotPassword(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);