import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import PersonalDataFormGroup from "./PersonalDataFormGroup";

class UserProfileCreate extends Component{
    state = {
        agreement: false
    }

    handleChange = (e) => {
        if (e.target.type === "checkbox") {
            this.setState({
                [e.target.id]: e.target.checked
            })
        }
    }

    getPersonalData = (personalData) => {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        let userType;
        const type1 = {
            type: "artysta",
            title: "Artysta"
        }
        const type2 = {
            type: "zespol",
            title: "Zespół"
        }

        const { type } = this.props.match.params;

        if (type === type1.type) userType = type1
        else if (type === type2.type) userType = type2
        else return "404"

        return (
            <div id={"signup-artist"} className={"page-content"}>
                <Container>
            dd        <Row className={"section section-card d-flex flex-column align-items-center"}>
                        <Col className={"background-light p-3 p-sm-5 my-2 my-sm-5 text-center"} xs={11} sm={10} md={8} lg={5}>
                            <h3 className={"mb-2"}>Rejestracja</h3>
                            <h6 className={"mb-5"}>{userType.title}</h6>

                            <Form id={"personal-data-form"} onSubmit={this.handleSubmit} style={{width: "100%"}}>
                                <PersonalDataFormGroup type={type} operation={"create"} />
                                <Form.Group className={"d-flex flex-column"}>
                                    <Form.Check id={"agreement"} type={"checkbox"} custom
                                                className={"align-self-start mb-2 d-flex flex-row align-items-center"}
                                                onChange={this.handleChange}
                                                label={<p style={{paddingTop: "2px"}}>Akceptuję <Link to="/regulamin" className={"underline"}>regulamin</Link></p>}/>

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

export default UserProfileCreate;