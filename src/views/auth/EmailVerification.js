import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import {sendVerificationEmail} from "../../store/actions/authActions";

class EmailVerification extends Component{

    sendVerificationEmail = () => {
        this.props.sendVerificationEmail();
    }

    render() {
        if ((this.props.auth.uid && this.props.auth.emailVerified) || !this.props.auth.uid) return <Redirect to={"/"}/>
        return (
            <div id={"forgot-password"} className={"page-content d-flex justify-content-center"}>
                <Container>
                    <Row className={"section section-card d-flex flex-column align-items-center"}>
                        <Col className={"background-light p-5 my-2 my-sm-5 text-center"} xs={11} sm={8} md={8} lg={8} xl={8}>
                            <h3 className={"mb-4"}>Potwierdź adres email</h3>
                            <p className={"mb-3"}>Aby przejść dalej musisz potwierdzić adres email.</p>
                            <p className={"mb-4"}>Sprawdź swoją skrzynkę odbiorczą (również folder Spam) lub naciśnij przycisk "Wyślij ponownie", aby otrzymać kolejnego maila z potwierdzeniem.</p>
                            { this.props.isVerificationEmailSend ?
                                <p><i className={"dark-text"}>Wysłano wiadomość</i></p>
                                : <Button variant="outline-accent" size="sm" className={"px-3"} onClick={this.sendVerificationEmail}>Wyślij ponownie</Button>
                            }
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
        isVerificationEmailSend: state.auth.isVerificationEmailSend
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendVerificationEmail: () => dispatch(sendVerificationEmail())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);