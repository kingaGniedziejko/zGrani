import React, { Component } from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";

import userPhoto from '../../../images/hemerson-coelho-Lf-Wbrr6_-Y-unsplash.jpg';

import Blocks from "./Blocks";
import ImageBlocksDisplay from "./ImageBlocksDisplay";

class ProfileDataFormGroup extends Component{
    state = {
        profilePhotoSrc: userPhoto,
        profileBackgroundSrc: userPhoto,
        status: [],
        description: '',
        gallery: [userPhoto, userPhoto, userPhoto, userPhoto],
        videos: []
    }

    handleChange = (e) => {
        if (e.target.nodeName === "SELECT") {
            let value = e.target.value;
            let id = e.target.id;
            let elements = this.state[id];

            if (value !== "Wybierz z listy") {
                if (!elements.includes(value)) elements.push(value);

                this.setState({
                    [id]: elements
                })
            }
        } else {
            this.setState({
                [e.target.id]: e.target.value
            })
        }
    }

    handleDelete = (slug, _) => {
        this.setState({[slug]: undefined})
    }

    handleArrayDelete = (slug, value) => {
        let elements = this.state[slug];
        let index = elements.indexOf(value)
        if (index !== -1) {
            elements.splice(index, 1);
            this.setState({[slug]: elements});
        }
    }

    blockInput = (title, slug) => {
        return (
            <Form.Group className={"mb-5"} style={{width: "100%"}}>
                <h6 className={"mb-3"}>{title}</h6>
                <Form.Control id={slug} as={"select"} value={-1} size="sm"
                              onChange={this.handleChange} className={"mb-3 dark-text"}>
                    <option disabled value={-1} key={-1}>Wybierz z listy</option>
                    <option>Rock</option>
                    <option>Classic</option>
                </Form.Control>
                <Blocks elementsList={this.state[slug]} align={"start"} editable={true} slug={slug} handler={this.handleArrayDelete}/>
            </Form.Group>
        )
    }

    render() {
        const { type, operation } = this.props;
        const { profilePhotoSrc, profileBackgroundSrc, gallery } = this.state;

        return (
            <Form.Group className={"d-flex flex-column align-items-center"}>
                <Form.Group as={Row} className={"d-flex flex-row justify-content-center"} style={{width: "100%"}}>
                    <Col className={"xs-6 p-0 mr-1"} style={{width: "100%"}}>
                        <h6 className={"mb-3"}>Zdjęcie&nbsp;profilowe</h6>
                        <ImageBlocksDisplay type={"single"} elementsList={profilePhotoSrc} slug={"profilePhotoSrc"} deleteHandler={this.handleDelete}/>
                    </Col>
                    <Col className={"xs-5 p-0 ml-1"} style={{width: "100%"}}>
                        <h6 className={"mb-3"}>Tło</h6>
                        <ImageBlocksDisplay type={"single"} elementsList={profileBackgroundSrc} slug={"profileBackgroundSrc"} deleteHandler={this.handleDelete}/>
                    </Col>
                </Form.Group>

                {this.blockInput("Status", "status")}

                <Form.Control id={"description"} as={"textarea"} rows={5} placeholder={"Opis"} onChange={this.handleChange} size="sm" className={"mb-5"}/>

                <h6 className={"mb-5"}>Nagrania</h6>

                <h6 className={"mb-3"}>Galeria</h6>
                <ImageBlocksDisplay type={"multiple"} elementsList={gallery} slug={"gallery"} deleteHandler={this.handleArrayDelete}/>

                <h6 className={"mb-5"}>Filmy</h6>
            </Form.Group>
        );
    }
}

export default ProfileDataFormGroup;