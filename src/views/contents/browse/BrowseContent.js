import React, { Component } from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
// import { firestoreConnect } from "react-redux-firebase";

import "../../../resources/styles/browse_style.css"
import { ChevronDown } from "react-bootstrap-icons";

import ProfileShortcut from "../profiles/ProfileShortcut";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {connect} from "react-redux";

class BrowseContent extends Component{

    browseFilters = (type) => {
        return (
            <Row className={"mb-5 justify-content-center"}>
                <Col className={"d-flex flex-column flex-sm-row align-items-center justify-content-center"} xs={8} sm={10} md={8} lg={6} xl={5}>
                    <h6 className={"mr-sm-4 mb-4 mb-sm-0 mt-1"}>Filtruj:</h6>

                    <Form.Control id={"genre"} as={"select"} defaultValue={-1} size="sm" onChange={this.handleChange}
                                  className={"mr-sm-4 mb-3 mb-sm-0 dark-text"}>
                        <option disabled value={-1} key={-1}>Gatunek</option>
                        <option>Rock</option>
                        <option>Classic</option>
                    </Form.Control>

                    {type === "artysta" ?
                        <Form.Control id={"instrument"} as={"select"} defaultValue={-1} size="sm" onChange={this.handleChange}
                                      className={"dark-text"}>
                            <option disabled value={-1} key={-1}>Instrument</option>
                            <option>Rock</option>
                            <option>Classic</option>
                        </Form.Control>
                        : ""
                    }
                </Col>
            </Row>
        )
    }

    browseContent = (type) => {
        const { users } = this.props;
        return (
            <div className={"section d-flex flex-column align-items-center"}>
                <Container>
                    <Row>
                        {users && users.map((user, index) => {
                            return (
                                <Col key={index} sm={6} lg><ProfileShortcut user={user}/></Col>
                            )
                        })}
                    </Row>
                </Container>
                <div className={"d-flex flex-column align-items-center"}>
                    <p className={"m-0"}>Więcej</p>
                    <ChevronDown/>
                </div>
            </div>
        );
    }


    render() {
        const { type } = this.props;

        return (
            <Container id={"browse-content d-flex flex-column align-items-center"}>
                {this.browseFilters(type)}
                {this.browseContent(type)}
            </Container>
        );
    }
}



const mapStateToProps = (state) => {

    console.log(state.firestore.ordered.users);
    return {
        users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['users'])
)(BrowseContent);
