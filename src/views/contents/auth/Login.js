import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { login } from "../../../store/actions/authActions";

class Login extends Component{
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
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
                            <Form onSubmit={this.handleSubmit} className={"mt-5"} style={{width: "100%"}}>
                                <Form.Group className={"d-flex flex-column align-items-center"}>
                                    <Form.Control id={"email"} type={"email"} placeholder={"Email"} onChange={this.handleChange} size="sm" className={"mb-3"}/>
                                    <Form.Control id={"password"} type={"password"} placeholder={"Hasło"} onChange={this.handleChange} size="sm" className={"mb-4"}/>

                                    <Button block type="submit" variant="outline-accent" size="sm" className={"mb-3"}>Zaloguj się</Button>

                                    <p className={"mb-3"}>lub</p>
                                    <Link to={"/rejestracja"} className={"d-block"} style={{width: "100%"}}>
                                        <Button block variant="outline-white" size="sm">Załóż konto</Button>
                                    </Link>
                                </Form.Group>
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