import React, { Component } from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";

import "../../../resources/styles/browse_style.css"

import ProfileShortcut from "../profiles/ProfileShortcut";
import Dropdown from "../profiles/DropdownInput";

class SearchContent extends Component{
    state = {
        isExtended: true,
        voivodeship: '',
        genre: '',
        instrument: '',
        instrument1: '',
        instrument2: ''
    }

    selectInput = (slug, placeHolder, disabled=false) => {
        return (
            <Form.Control id={slug} as={"select"} defaultValue={-1} size="sm" onChange={this.handleChange}
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

    toggleSelected = (id, name, slug, isMultiple) => {
        if (!isMultiple) {
            this.setState({
                [slug]: name
            })
        }
        // else {
        //     let elements = this.state[slug];
        //     if (!elements.includes(name)) elements.push(name);
        //
        //     this.setState({
        //         [slug]: elements
        //     })
        // }
    }

    browseFilters = (type) => {
        const {isExtended} = this.state;
        const { voivodeships, genres, instruments } = this.props;

        return (
            <Container className={"mb-5 d-flex flex-column align-items-center"}>
                <Row className={"mb-4"}>
                    <Col className={"clickable d-flex flex-row align-items-center"} onClick={this.changeIsExtended}>
                        <h5>Filtry</h5>
                        {isExtended ?
                            <ChevronUp className={"ml-3"} size={20}/>
                            :
                            <ChevronDown className={"ml-3"} size={20}/>
                        }
                    </Col>
                </Row>

                {isExtended ?

                    <Row className={"justify-content-center mt-2"} style={{width: "100%"}}>
                        <Col className={"d-flex flex-column align-items-center mb-3"} xs={11} sm={6} md={5} lg={4} xl={3}>
                            <h6 className={"mb-4"}>Cel</h6>
                            <Form.Group className={"block"}>
                                <Form.Check id={"purpose"} name={"purpose"} value={"1"} type={"radio"} custom className={"align-self-start mb-2 d-flex flex-row align-items-center"}
                                            onChange={this.handleChange}
                                            label={<p style={{paddingTop: "2px"}}>Zlecenie</p>}/>

                                <Form.Check id={"purpose"} name={"purpose"} value={"2"} type={"radio"} custom className={"align-self-start mb-2 d-flex flex-row align-items-center"}
                                            onChange={this.handleChange}
                                            label={<p style={{paddingTop: "2px"}}>{type === "artysta" ? "Zaproszenie do zespołu" : "Dołączenie do zespołu"}</p>}/>

                                {type === "artysta" ? "" :
                                    <div className={"block pl-4 mb-3"}>
                                        <Dropdown placeholder={"Instrument"} value={this.state.instrument1} list={instruments} slug={"instrument1"} toggleItem={this.toggleSelected} />
                                    </div>
                                }

                                <Form.Check id={"purpose"} name={"purpose"} value={"3"} type={"radio"} custom className={"align-self-start mb-2 d-flex flex-row align-items-center"}
                                            onChange={this.handleChange}
                                            label={<p style={{paddingTop: "2px"}}>Zastępstwo</p>}/>

                                {type === "artysta" ? "" :
                                    <div className={"block pl-4 mb-3"}>
                                        <Dropdown placeholder={"Instrument"} value={this.state.instrument2} list={instruments} slug={"instrument2"} toggleItem={this.toggleSelected} />
                                    </div>
                                }

                                <Form.Check id={"purpose"} name={"purpose"} value={"4"} type={"radio"} custom className={"align-self-start mb-2 d-flex flex-row align-items-center"}
                                            onChange={this.handleChange}
                                            label={<p style={{paddingTop: "2px"}}>Brak</p>}/>
                            </Form.Group>

                        </Col>
                        <Col className={"d-flex flex-column align-items-center"} xs={11} sm={6} md={5} lg={4} xl={3}>
                            <h6 className={"mb-4"}>Parametry</h6>

                            <div className={"block mb-3"}>
                                <Dropdown placeholder={"Województwo"} value={this.state.voivodeship} list={voivodeships} slug={"voivodeship"} toggleItem={this.toggleSelected} />
                            </div>

                            <Form.Control id={"city"} type={"text"} placeholder={"Miasto"} onChange={this.handleChange} size="sm" className={"mb-3"}/>

                            <div className={"block mb-3"}>
                                <Dropdown placeholder={"Gatunek"} value={this.state.genre} list={genres} slug={"genre"} toggleItem={this.toggleSelected} />
                            </div>

                            {type === "artysta" ?
                                <div className={"block mb-3"}>
                                    <Dropdown placeholder={"Instrument"} value={this.state.instrument} list={instruments} slug={"instrument"} toggleItem={this.toggleSelected} />
                                </div>
                                : ""
                            }
                        </Col>
                    </Row>
                    : ""
                }
            </Container>
        )
    }

    browseContent = (_) => {
        const { users } = this.props;
        return (
            <div className={"section d-flex flex-column align-items-center"}>
                <Container>
                    <Row>
                        {users && users.map((user, index) => {
                            return (
                                <Col key={index} sm={6} lg={3}><ProfileShortcut user={user}/></Col>
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
            <div id={"browse-content"} className={"d-flex flex-column align-items-center block"}>
                {this.browseFilters(type)}
                {this.browseContent(type)}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state.firestore.ordered.users);
    return {
        users: state.firestore.ordered.users,
        voivodeships: state.firestore.ordered.voivodeships,
        genres: state.firestore.ordered.genres,
        instruments: state.firestore.ordered.instruments
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['users', 'voivodeships', 'genres', 'instruments'])
)(SearchContent);

