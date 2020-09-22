import React, { Component } from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

class SignupTyped extends Component{
    render() {
        let signupType;
        const type1 = {
            type: "artysta",
            title: "Artysta",
            nameFieldText: "Pseudonim"
        }
        const type2 = {
            type: "zespol",
            title: "Zespół",
            nameFieldText: "Nazwa zespołu"
        }

        const { type } = this.props.match.params;

        if (type === type1.type) signupType = type1
        else if (type === type2.type) signupType = type2
        else return "404"

        return (
            <div id={"signup-artist"} className={"page-content"}>
                <Container>
                    <Row className={"section section-card d-flex flex-column align-items-center"}>
                        <Col className={"background-light p-5 my-2 my-sm-5 text-center"} xs={11} sm={8} md={7} lg={4}>
                            <h3 className={"mb-2"}>Rejestracja</h3>
                            <h6 className={"mb-5"}>{signupType.title}</h6>

                            <Form onSubmit={this.handleSubmit} style={{width: "100%"}}>
                                <Form.Group className={"d-flex flex-column align-items-center"}>
                                    <Form.Control id={"login"} type={"text"} placeholder={"Login"} onChange={this.handleChange} className={"mb-3"}/>
                                    <Form.Control id={"email"} type={"email"} placeholder={"Email"} onChange={this.handleChange} className={"mb-3"}/>
                                    <Form.Control id={"password"} type={"password"} placeholder={"Hasło"} onChange={this.handleChange} className={"mb-5"}/>

                                    <Form.Control id={"name"} type={"text"} placeholder={signupType.nameFieldText} onChange={this.handleChange} className={"mb-3"}/>
                                    <Form.Control id={"country"} type={"text"} placeholder={"Państwo"} onChange={this.handleChange} className={"mb-3"}/>
                                    <Form.Control id={"city"} type={"text"} placeholder={"Miasto"} onChange={this.handleChange} className={"mb-5"}/>

                                    <Button block type="submit" variant="outline-accent" size="sm" className={"mb-3"}>Załóż konto</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SignupTyped;