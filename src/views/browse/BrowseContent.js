import React, { Component } from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";

import "../../resources/styles/browse_style.css"

import Dropdown from "../layout/inputs/DropdownInput";
import BrowseDisplay from "./BrowseDisplay";
import Blocks from "../layout/displays/Blocks";

class BrowseContent extends Component{
    state = {
        genres: [],
        instruments: []
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
        else {
            let elements = this.state[slug];
            if (!elements.includes(item)) elements.push(item);

            this.setState({
                [slug]: elements
            })
        }
    }

    handleDelete = (slug, item) => {
        let elements = this.state[slug];
        let index = elements.indexOf(item)
        if (index !== -1) {
            elements.splice(index, 1);
            this.setState({[slug]: elements});
        }
    }

    blockInput = (title, slug, dataSlug) => {
        let list = this.props[dataSlug];

        return (
            <Form.Group className={"list-select mb-3"} style={{width: "100%"}}>
                {/*<h6 className={"mb-3"}>{title}</h6>*/}

                <div className={"block mb-3"}>
                    <Dropdown placeholder={title} list={list} slug={slug} toggleItem={this.toggleSelected} isMultiple={true}/>
                </div>

                <Blocks elementsList={this.state[slug]} align={"start"} editable={true} slug={slug} handler={this.handleDelete} flex_1={true}/>
            </Form.Group>
        )
    }

    browseFilters = (isArtist) => {
        return (
            <Row className={"mb-5 justify-content-center"}>
                <Col className={"d-flex flex-column flex-sm-row align-items-center align-items-sm-baseline justify-content-center col-11"
                        + (isArtist ? " col-sm-11 col-lg-9 col-xl-8" : " col-sm-11 col-md-7 col-lg-5 col-xl-5")}>
                    <h6 className={"mr-sm-4 mb-4 mb-sm-0 mt-1"}>Filtruj:</h6>

                    <div className={"mr-sm-3 mb-sm-0 block text-left animated-label"}>
                        { this.blockInput("Gatunki", "genres", "genres") }
                    </div>

                    {isArtist ?
                        <div className={"block text-left animated-label mt-2 mt-sm-0"}>
                            { this.blockInput("Instrumenty", "instruments", "instruments") }
                        </div>
                        : ""
                    }
                </Col>
            </Row>
        )
    }

    browseContent = (isArtist) => {
        return(
            <BrowseDisplay
                isArtist={isArtist}
                genres={this.state.genres.map(genre => genre.id)}
                instruments={this.state.instruments.map(instrument => instrument.id)}
            />
        );
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
