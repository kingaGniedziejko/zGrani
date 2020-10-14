import React, { Component } from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";

import "../../../resources/styles/browse_style.css"
import { ChevronDown } from "react-bootstrap-icons";

import ProfileShortcut from "../profiles/ProfileShortcut";
import Dropdown from "../profiles/DropdownInput";

class BrowseContent extends Component{
    state = {
        genre: '',
        instrument: ''
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
        const { genres, instruments } = this.props;

        return (
            <Row className={"mb-5 justify-content-center"}>
                <Col className={"d-flex flex-column flex-sm-row align-items-center justify-content-center"} xs={8} sm={12} md={9} lg={7} xl={6}>
                    <h6 className={"mr-sm-4 mb-4 mb-sm-0 mt-1"}>Filtruj:</h6>

                    <div className={"mr-sm-3 mb-3 mb-sm-0 block"}>
                        <Dropdown placeholder={"Gatunek"} value={this.state.genre} list={genres} slug={"genre"} toggleItem={this.toggleSelected} />
                    </div>

                    {type === "artysta" ?
                        <div className={"block "}>
                            <Dropdown placeholder={"Instrument"} value={this.state.instrument} list={instruments} slug={"instrument"} toggleItem={this.toggleSelected}/>
                        </div>
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
                                <Col key={index} sm={6} lg={3}><ProfileShortcut user={user}/></Col>
                            )
                        })}
                    </Row>
                </Container>
                <div className={"d-flex flex-column align-items-center clickable"}>
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
        users: state.firestore.ordered.users,
        genres: state.firestore.ordered.genres,
        instruments: state.firestore.ordered.instruments
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['users', 'genres', 'instruments'])
)(BrowseContent);
