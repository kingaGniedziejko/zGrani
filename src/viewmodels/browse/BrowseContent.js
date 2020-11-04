import React, { Component } from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";

import "../../resources/styles/browse_style.css"

import Dropdown from "../../views/inputs/DropdownInput";
import BrowseDisplay from "./BrowseDisplay";

class BrowseContent extends Component{
    state = {
        genre: '',
        instrument: ''
    }


    toggleSelected = (id, item, slug, isMultiple) => {
        if (!isMultiple) {
            if (item.id === "all") {
                this.setState({
                    [slug]: ""
                })
            } else {
                this.setState({
                    [slug]: item
                })
            }
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

    browseFilters = (isArtist) => {
        const { genres, instruments } = this.props;

        let genresArray = [{id: "all", name: "-"}].concat(genres);
        let instrumentsArray = [{id: "all", name: "-"}].concat(instruments);

        return (
            <Row className={"mb-5 justify-content-center"}>
                <Col className={"d-flex flex-column flex-sm-row align-items-center justify-content-center"} xs={8} sm={12} md={9} lg={7} xl={6}>
                    <h6 className={"mr-sm-4 mb-4 mb-sm-0 mt-1"}>Filtruj:</h6>

                    <div className={"mr-sm-3 mb-3 mb-sm-0 block"}>
                        <Dropdown placeholder={"Gatunek"} value={this.state.genre} list={genresArray} slug={"genre"} toggleItem={this.toggleSelected} />
                    </div>

                    {isArtist ?
                        <div className={"block "}>
                            <Dropdown placeholder={"Instrument"} value={this.state.instrument} list={instrumentsArray}
                                      slug={"instrument"} toggleItem={this.toggleSelected}/>
                        </div>
                        : ""
                    }
                </Col>
            </Row>
        )
    }

    browseContent = (isArtist) => {
        return <BrowseDisplay isArtist={isArtist} genre={this.state.genre} instrument={this.state.instrument}/>
    }


    render() {
        const { isArtist } = this.props;

        return (
            <Container id={"browse-content d-flex flex-column align-items-center"}>
                {this.browseFilters(isArtist)}
                {this.browseContent(isArtist)}
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        genres: state.firestore.ordered.genres,
        instruments: state.firestore.ordered.instruments
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect ( () => [
            {collection: "genres", orderBy: "name"},
            {collection: "instruments", orderBy: "name"}
        ]
    )
)(BrowseContent);
