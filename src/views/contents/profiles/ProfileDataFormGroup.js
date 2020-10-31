import React, { Component } from 'react';
import { Col, Form, Row } from "react-bootstrap";

import userPhoto from '../../../resources/images/hemerson-coelho-Lf-Wbrr6_-Y-unsplash.jpg';

import Blocks from "./Blocks";
import ImageBlocksDisplay from "./ImageBlocksDisplay";

class ProfileDataFormGroup extends Component{
    // state = {
    //     profilePhotoSrc: userPhoto,
    //     profileBackgroundSrc: userPhoto,
    //     description: '',
    //     gallery: [userPhoto, userPhoto, userPhoto, userPhoto],
    //     videos: []
    // }

    handleChange = (e) => {
        this.props.handleUpdate(e.target.id, e.target.value);
    }

    handleDelete = (slug, _) => {
        this.props.handleUpdate(slug, undefined);
    }

    handleArrayAdd = (slug, value) => {
        let elements = this.props.state[slug];

        if (!elements.includes(value)) {
            elements.push(value);
        }

        this.props.handleUpdate(slug, elements);
    }

    handleArrayDelete = (slug, value) => {
        let elements = this.props.state[slug];
        let index = elements.indexOf(value)
        if (index !== -1) {
            elements.splice(index, 1);
            this.props.handleUpdate(slug, elements);
        }
    }

    render() {
        const { profile, handleUpdate, state }  = this.props;

        return (
            <Form.Group className={"d-flex flex-column align-items-center"}>
                <Form.Group as={Row} className={"d-flex flex-row justify-content-center"} style={{width: "100%"}}>
                    <Col className={"xs-6 p-0 mr-1"} style={{width: "100%"}}>
                        <h6 className={"mb-3"}>Zdjęcie&nbsp;profilowe</h6>
                        <ImageBlocksDisplay
                            type={"single"}
                            elementsList={state.profilePhotoSrc}
                            slug={"profilePhotoSrc"}
                            deleteHandler={this.handleDelete}
                            addHandler={handleUpdate}/>
                    </Col>
                    <Col className={"xs-5 p-0 ml-1"} style={{width: "100%"}}>
                        <h6 className={"mb-3"}>Tło</h6>
                        <ImageBlocksDisplay
                            type={"single"}
                            elementsList={state.profileBackgroundSrc}
                            slug={"profileBackgroundSrc"}
                            deleteHandler={this.handleDelete}
                            addHandler={handleUpdate}
                        />
                    </Col>
                </Form.Group>

                <Form.Control
                    id={"description"}
                    as={"textarea"}
                    rows={5}
                    placeholder={"Opis"}
                    maxLength={"1000"}
                    defaultValue={profile && profile.description}
                    size="sm"
                    className={"mb-5"}
                    onChange={this.handleChange}
                />

                <h6 className={"mb-3"}>Nagrania</h6>
                <Form.File id="recordings" multiple className={"mb-5 default-file-input"}/>

                <h6 className={"mb-3"}>Galeria</h6>
                <ImageBlocksDisplay
                    type={"multiple"}
                    elementsList={state.gallery}
                    slug={"gallery"}
                    deleteHandler={this.handleArrayDelete}
                    addHandler={this.handleArrayAdd}
                />

                <h6 className={"mb-5"}>Filmy</h6>
            </Form.Group>
        );
    }
}

export default ProfileDataFormGroup;