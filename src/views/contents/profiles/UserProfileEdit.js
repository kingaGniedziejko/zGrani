import React, { Component } from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {compose} from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import PersonalDataFormGroup from "./PersonalDataFormGroup";
import ProfileDataFormGroup from "./ProfileDataFormGroup";
import {firestoreConnect} from "react-redux-firebase";

class UserProfileEdit extends Component{
    state = {
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
        const { user, auth } = this.props;
        const { id } = this.props.match.params;

        if (!auth.uid || auth.uid !== id) return <Redirect to={"/logowanie"} />

        let type = "artysta";
        let userType;
        const type1 = {
            type: "artysta",
            title: "Artysta"
        }
        const type2 = {
            type: "zespol",
            title: "Zespół"
        }

        if (type === type1.type) userType = type1;
        else if (type === type2.type) userType = type2;

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
                                            <PersonalDataFormGroup type={type} operation={"edit"} user={user}/>
                                        </Col>
                                        <Col xs={11} lg={5} className={"ml-2"}>
                                            <h5 className={"mt-2 mb-5"}>Dodatkowe dane</h5>
                                            <ProfileDataFormGroup type={type} operation={"edit"} />
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
    const { id } = ownProps.match.params;
    const users = state.firestore.data.users;

    const user = users ? users[id] : null

    return {
        user: user,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['users'])
)(UserProfileEdit);