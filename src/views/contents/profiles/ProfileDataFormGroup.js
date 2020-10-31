import React, { Component } from 'react';
import { Col, Form, Row } from "react-bootstrap";

import ImageBlocksDisplay from "./ImageBlocksDisplay";

class ProfileDataFormGroup extends Component {

    handleChange = (e) => {
        this.props.handleUpdate(e.target.id, e.target.value);
    }

    handleAdd = (slug, imageSlug, imageUrl, image) => {
        this.props.handleUpdate(slug, imageUrl);
        this.props.handleUpdate(imageSlug, image);
    }

    handleDelete = (slug, imageSlug, _) => {
        this.props.handleUpdate(slug, undefined);
        this.props.handleUpdate(imageSlug, undefined);
    }

    handleArrayAdd = (slug, imageSlug, imageUrl, image) => {
        let elementsUrl = this.props.state[slug];
        let elements = this.props.state[imageSlug];

        if (!elementsUrl.includes(imageUrl)) elementsUrl.push(imageUrl);
        if (!elements.includes(image)) elements.push(image);

        this.props.handleUpdate(slug, elementsUrl);
        this.props.handleUpdate(imageSlug, elements);
    }

    handleArrayDelete = (slug, imageSlug, imageUrl) => {
        let elementsUrl = this.props.state[slug];
        let elements = this.props.state[imageSlug];

        let index = elementsUrl.indexOf(imageUrl);

        if (index !== -1) {
            elementsUrl.splice(index, 1);
            elements.splice(index, 1);
            this.props.handleUpdate(slug, elementsUrl);
            this.props.handleUpdate(imageSlug, elements);
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
                            imageSlug={"profilePhoto"}
                            deleteHandler={this.handleDelete}
                            addHandler={this.handleAdd}/>
                    </Col>
                    <Col className={"xs-5 p-0 ml-1"} style={{width: "100%"}}>
                        <h6 className={"mb-3"}>Tło</h6>
                        <ImageBlocksDisplay
                            type={"single"}
                            elementsList={state.profileBackgroundSrc}
                            slug={"profileBackgroundSrc"}
                            imageSlug={"profileBackground"}
                            deleteHandler={this.handleDelete}
                            addHandler={this.handleAdd}
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