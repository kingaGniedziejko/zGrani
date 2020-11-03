import React, { Component } from 'react';
import { Col, Form, Row } from "react-bootstrap";

import ImageBlocksDisplay from "./ImageBlocksDisplay";
import BlocksRecordsDisplay from "./BlocksRecordsDisplay";

class ProfileDataFormGroup extends Component {

    handleChange = (e) => {
        this.props.handleUpdate(e.target.id, e.target.value);
    }

    handleAdd = (slug, imageSlug, imageUrl, image) => {
        this.props.handleUpdate(slug, imageUrl);
        this.props.handleUpdate(imageSlug, image);
    }

    handleDelete = (slug, fileSlug, _, __, ___) => {
        this.props.handleUpdate(slug, undefined);
        this.props.handleUpdate(fileSlug, undefined);
    }

    handleImageArrayAdd = (slug, fileSlug, fileUrl, file) => {
        let elementsUrl = this.props.state[slug];
        let elements = this.props.state[fileSlug];

        if (!elementsUrl.includes(fileUrl)) elementsUrl.push(fileUrl);
        if (!elements.includes(file)) elements.push(file);

        this.props.handleUpdate(slug, elementsUrl);
        this.props.handleUpdate(fileSlug, elements);
    }

    handleImageArrayDelete = (slug, fileSlug, srcSlug, deletedSlug, index) => {
        let elementsSrc = this.props.state[srcSlug];
        let elementsSrcNew = this.props.state[slug];
        let elementsNew = this.props.state[fileSlug];
        let elementsDeleted = this.props.state[deletedSlug];

        let globalElementsLength = elementsSrc.length;

        if ((index + 1) <= globalElementsLength) {
            let fileUrl = elementsSrc[index];
            elementsSrc.splice(index, 1);
            elementsDeleted.push(fileUrl);

            this.props.handleUpdate(srcSlug, elementsSrc);
            this.props.handleUpdate(deletedSlug, elementsDeleted);
        } else {
            elementsSrcNew.splice((index - globalElementsLength), 1);
            elementsNew.splice((index - globalElementsLength), 1);

            this.props.handleUpdate(slug, elementsSrcNew);
            this.props.handleUpdate(fileSlug, elementsNew);
        }
    }

    render() {
        const { profile, state }  = this.props;

        return (
            <Form.Group className={"d-flex flex-column align-items-center"}>
                <Form.Group as={Row} className={"d-flex flex-row justify-content-center"} style={{width: "100%"}}>
                    <Col className={"xs-6 p-0 mr-1"} style={{width: "100%"}}>
                        <h6 className={"mb-3"}>Zdjęcie&nbsp;profilowe</h6>
                        <ImageBlocksDisplay
                            type={"single"}
                            elementsList={state.profilePhotoSrc}
                            slug={"profilePhotoSrc"}
                            fileSlug={"profilePhoto"}
                            addHandler={this.handleAdd}
                            deleteHandler={this.handleDelete}
                        />
                    </Col>
                    {/*<Col className={"xs-5 p-0 ml-1"} style={{width: "100%"}}>*/}
                    {/*    <h6 className={"mb-3"}>Tło</h6>*/}
                    {/*    <ImageBlocksDisplay*/}
                    {/*        type={"single"}*/}
                    {/*        elementsList={state.profileBackgroundSrc}*/}
                    {/*        slug={"profileBackgroundSrc"}*/}
                    {/*        fileSlug={"profileBackground"}*/}
                    {/*        addHandler={this.handleAdd}*/}
                    {/*        deleteHandler={this.handleDelete}*/}
                    {/*    />*/}
                    {/*</Col>*/}
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

                <h6 className={"mb-4 mt-2"}>Nagrania</h6>
                <BlocksRecordsDisplay
                    elementsList={state.recordingsSrc.concat(state.recordingsSrcNew)}
                    srcSlug={"recordingsSrc"}
                    slug={"recordingsSrcNew"}
                    fileSlug={"recordingsNew"}
                    deletedSlug={"recordingsDeleted"}
                    addHandler={this.handleImageArrayAdd}
                    deleteHandler={this.handleImageArrayDelete}
                />

                <h6 className={"mb-4 mt-2"}>Galeria</h6>
                <ImageBlocksDisplay
                    type={"multiple"}
                    elementsList={state.gallerySrc.concat(state.gallerySrcNew)}
                    srcSlug={"gallerySrc"}
                    slug={"gallerySrcNew"}
                    fileSlug={"galleryNew"}
                    deletedSlug={"galleryDeleted"}
                    addHandler={this.handleImageArrayAdd}
                    deleteHandler={this.handleImageArrayDelete}
                />

                <h6 className={"mb-5"}>Filmy</h6>
            </Form.Group>
        );
    }
}

export default ProfileDataFormGroup;