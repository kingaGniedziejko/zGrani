import React, { Component } from 'react';
import { Button, Col, Container, Form, Row} from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { Radio, RadioGroup } from 'react-radio-group';
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import "../../../resources/styles/browse_style.css"

import Dropdown from "../profiles/DropdownInput";
import SearchDisplay from "./SearchDisplay";

class SearchContent extends Component {
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

    handleOnChange = (e) => {
        console.log(e);
    }

    searchFilters = (isArtist) => {
        const { isExtended } = this.state;
        const { filteredStatus, voivodeships, genres, instruments } = this.props;

        if (!filteredStatus || !voivodeships || !genres || !instruments) return "";

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

                <Form className={"block d-flex flex-column align-items-center"}>
                    {isExtended ?
                        <Row className={"justify-content-center mt-2"} style={{width: "100%"}}>
                            <Col className={"d-flex flex-column align-items-center mb-3"} xs={11} sm={6} md={5} lg={4} xl={3}>
                                <h6 className={"mb-4"}>Cel</h6>

                                <RadioGroup name="purpose" onChange={(e) => this.handleOnChange(e)}>
                                    {filteredStatus.map((status, index) => {
                                        return (
                                            <div className="radio-button-background mb-2" key={index}>
                                                <div className={"d-flex flex-row align-items-center mb-1"}>
                                                    <Radio value={status.id} className="radio-button mr-2"/>
                                                    <p className={"d-inline-block"}>{status.purposeName.charAt(0).toUpperCase() + status.purposeName.slice(1)}</p>
                                                </div>
                                                {
                                                    status.withInstrument ?
                                                        <div className={"block pl-4 mb-3"}>
                                                            <Dropdown placeholder={"Instrument"}
                                                                      value={this.state["instrument-" + status.id]}
                                                                      list={instruments}
                                                                      slug={"instrument-" + status.id}
                                                                      toggleItem={this.toggleSelected} />
                                                        </div>
                                                        : ""
                                                }
                                            </div>
                                        )
                                    })}
                                    <div className="radio-button-background">
                                        <Radio value={""} className="radio-button mr-2"/>
                                        <p className={"d-inline-block"}>Brak</p>
                                    </div>
                                </RadioGroup>
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

                                {isArtist ?
                                    <div className={"block mb-3"}>
                                        <Dropdown placeholder={"Instrument"} value={this.state.instrument} list={instruments} slug={"instrument"} toggleItem={this.toggleSelected} />
                                    </div>
                                    : ""
                                }
                            </Col>
                        </Row>
                        : ""
                    }
                    <Button type="submit" variant="outline-accent" size="sm" className={"mt-3 px-4"}>Szukaj</Button>
                </Form>
            </Container>
        )
    }

    searchContent = (isArtist) => {
        return <SearchDisplay isArtist={isArtist}/>
    }


    render() {
        const { isArtist } = this.props;

        return (
            <div id={"search-content"} className={"d-flex flex-column align-items-center block"}>
                {this.searchFilters(isArtist)}
                {this.searchContent(isArtist)}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        filteredStatus: state.firestore.ordered.filteredStatus,
        voivodeships: state.firestore.ordered.voivodeshipsOrdered,
        genres: state.firestore.ordered.genresOrdered,
        instruments: state.firestore.ordered.instrumentsOrdered
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        { collection: "status", where: ["type", "in", [(props.isArtist ? "artist" : "band") , "all"]], storeAs: "filteredStatus"},
        { collection: 'voivodeships', orderBy: "name", storeAs: "voivodeshipsOrdered" },
        { collection: 'genres', orderBy: "name", storeAs: "genresOrdered" },
        { collection: 'instruments', orderBy: "name", storeAs: "instrumentsOrdered"}
    ])
)(SearchContent);

