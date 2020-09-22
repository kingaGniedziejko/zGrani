import React, { Component } from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import MVVM from "react-mvvm";

class Login extends MVVM.ViewComponent{
    state = {
        login: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div id={"login"} className={"page-content d-flex justify-content-center"}>
                <Container>
                    <Row className={"section section-card d-flex flex-column align-items-center"}>
                        <Col className={"background-light p-5 my-2 my-sm-5 text-center"} xs={11} sm={8} md={7} lg={4}>
                            <h3 className={"mb-5"}>Logowanie</h3>
                            <Form onSubmit={this.handleSubmit} style={{width: "100%"}}>
                                <Form.Group className={"d-flex flex-column align-items-center"}>
                                    <Form.Control id={"login"} type={"text"} placeholder={"Login"} onChange={this.handleChange} className={"mb-3"}/>
                                    <Form.Control id={"password"} type={"password"} placeholder={"Hasło"} onChange={this.handleChange} className={"mb-4"}/>

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

export default Login;