import React, { Component } from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";

import "../../../styles/browse_style.css"
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

import ProfileShortcut from "../profiles/ProfileShortcut";

class SearchContent extends Component{
    state = {
        isExtended: false
    }

    selectInput = (slug, placeHolder, disabled=false) => {
        return (
            <Form.Control id={slug} as={"select"} value={-1} size="sm" onChange={this.handleChange}
                          className={"dark-text mb-3"} >
                <option disabled value={-1} key={-1}>{placeHolder}</option>
                <option>Rock</option>
                <option>Classic</option>
            </Form.Control>
        )
    }

    changeIsExtended = () => {
        this.setState({isExtended: !this.state.isExtended})
    }

    browseFilters = () => {
        const {isExtended} = this.state;
        const {type} = this.props;

        return (
            <Container className={"mb-5 d-flex flex-column align-items-center"}>
                <Row className={"mb-4"}>
                    <Col className={"d-flex flex-row align-items-center"}>
                        <h6>Filtry</h6>
                        {isExtended ?
                            <ChevronUp className={"clickable ml-3"} size={20} onClick={this.changeIsExtended}/>
                            :
                            <ChevronDown className={"clickable ml-3"} size={20} onClick={this.changeIsExtended}/>
                        }
                    </Col>
                </Row>

                {isExtended ?

                    <Row className={"justify-content-center mt-2"} style={{width: "100%"}}>
                        <Col className={"d-flex flex-column align-items-center"} xs={3}>
                            <p className={"mb-3"}>Cel</p>
                            <Form.Group>
                                <Form.Check id={"purpose"} name={"purpose"} value={"1"} type={"radio"} custom className={"align-self-start mb-2 d-flex flex-row align-items-center"}
                                            onChange={this.handleChange}
                                            label={<p style={{paddingTop: "2px"}}>Zlecenie</p>}/>

                                <Form.Check id={"purpose"} name={"purpose"} value={"2"} type={"radio"} custom className={"align-self-start mb-2 d-flex flex-row align-items-center"}
                                            onChange={this.handleChange}
                                            label={<p style={{paddingTop: "2px"}}>{type === "artysta" ? "Zaproszenie do zespołu" : "Dołączenie do zespołu"}</p>}/>

                                {type === "artysta" ? "" :
                                    <div className={"pl-4 mb-3"}>
                                        {this.selectInput("instrument", "Instrument", true)}
                                    </div>
                                }

                                <Form.Check id={"purpose"} name={"purpose"} value={"3"} type={"radio"} custom className={"align-self-start mb-2 d-flex flex-row align-items-center"}
                                            onChange={this.handleChange}
                                            label={<p style={{paddingTop: "2px"}}>Zastępstwo</p>}/>

                                <Form.Check id={"purpose"} name={"purpose"} value={"4"} type={"radio"} custom className={"align-self-start mb-2 d-flex flex-row align-items-center"}
                                            onChange={this.handleChange}
                                            label={<p style={{paddingTop: "2px"}}>Brak</p>}/>
                            </Form.Group>

                        </Col>
                        <Col className={"d-flex flex-column align-items-center"} xs={3}>
                            <p className={"mb-3"}>Parametry</p>
                            {this.selectInput("voivodeship", "Województwo")}
                            <Form.Control id={"city"} type={"text"} placeholder={"Miasto"} onChange={this.handleChange} size="sm" className={"mb-3"}/>
                            {this.selectInput("genre", "Gatunek")}
                            {type === "artysta" ? this.selectInput("instrument", "Instrument") : ""}
                        </Col>
                    </Row>

                    : ""

                }


            </Container>
        )
    }

    browseContent = () => {
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
                {this.browseFilters()}
                {this.browseContent()}
            </div>
        );
    }
}

export default SearchContent;
