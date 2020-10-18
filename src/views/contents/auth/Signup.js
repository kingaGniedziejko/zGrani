import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"

class Signup extends Component{
    render() {
        const { auth } = this.props;

        if (auth.uid) return <Redirect to={"/"} />;

        return (
            <div id={"signup"} className={"page-content"}>
                <div className={"d-flex flex-column align-items-center py-5"}>
                    <h3 className={"mb-5"}>Rejestracja</h3>
                    <Container>
                        <Row className={"justify-content-center"}>
                            <Col xs={11} md={4} lg={3} className={"text-center m-2"}>
                                <Link to={"/rejestracja/artysta"} className={"d-block background-light p-5"}>
                                    <div>Artysta</div>
                                </Link>
                            </Col>
                            <Col xs={11} md={4} lg={3} className={"text-center m-2"}>
                                <Link to={"/rejestracja/zespol"} className={"d-block background-light p-5"}>
                                    <div>Zespół</div>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Signup);