import React, { Component } from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";

import "../../../styles/browse_style.css"
import { ChevronDown } from "react-bootstrap-icons";

import ProfileShortcut from "../profiles/ProfileShortcut";

class BrowseContent extends Component{

    browseFilters = (type) => {
        return (
            <div className={"mb-5 d-flex flex-row justify-content-center"}>
                <h6 className={"mr-4 mt-1"}>Filtruj:</h6>

                <Form.Control id={"genre"} as={"select"} value={-1} size="sm" onChange={this.handleChange}
                              className={"mr-4 dark-text"} style={{width: "fit-content"}}>
                    <option disabled value={-1} key={-1}>Gatunek</option>
                    <option>Rock</option>
                    <option>Classic</option>
                </Form.Control>

                {type === "artysta" ?
                    <Form.Control id={"instrument"} as={"select"} value={-1} size="sm" onChange={this.handleChange}
                                  className={"dark-text"} style={{width: "fit-content"}}>
                        <option disabled value={-1} key={-1}>Instrument</option>
                        <option>Rock</option>
                        <option>Classic</option>
                    </Form.Control>
                    : ""
                }
            </div>
        )
    }

    browseContent = (type) => {
        return (
            <div className={"section d-flex flex-column align-items-center"}>
                <Container>
                    <Row>
                        <Col sm={6} lg><ProfileShortcut/></Col>
                        <Col sm={6} lg><ProfileShortcut/></Col>
                        <Col sm={6} lg><ProfileShortcut/></Col>
                        <Col sm={6} lg><ProfileShortcut/></Col>
                    </Row>
                    <Row>
                        <Col sm={6} lg><ProfileShortcut/></Col>
                        <Col sm={6} lg><ProfileShortcut/></Col>
                        <Col sm={6} lg><ProfileShortcut/></Col>
                        <Col sm={6} lg><ProfileShortcut/></Col>
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
            <div id={"browse-content d-flex flex-column align-items-center"}>
                {this.browseFilters(type)}
                {this.browseContent(type)}
            </div>
        );
    }
}

export default BrowseContent;
