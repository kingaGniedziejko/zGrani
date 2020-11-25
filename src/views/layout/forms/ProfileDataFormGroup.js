import React, { Component } from 'react';
import { Col, Form, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube, faInstagram, faSoundcloud } from "@fortawesome/free-brands-svg-icons";
import { faGlobeAmericas, faLink } from "@fortawesome/free-solid-svg-icons";

import BlocksImage from "../displays/BlocksImage";
import BlocksRecords from "../displays/BlocksRecords";
import isURL from "validator/es/lib/isURL";
import isEmpty from "validator/es/lib/isEmpty";

class ProfileDataFormGroup extends Component {

    handleChange = (e) => {
        const { id, value } = e.target;

        this.props.handleUpdate(id, value);

        if (this.props.state.errors[id]) {
            this.props.handleUpdate(
                "errors",
                {
                    ...this.props.state.errors,
                    [id]: ""
                }
            )
        }
    }

    evaluateFields = (slugs) => {
        const {errors} = this.props.state;
        let newErrors = {};

        slugs.forEach(slug => {
            const value = this.props.state[slug];
            let errorMessage = "";

            switch (slug) {
                case "facebookLink":
                case "youtubeLink":
                case "instagramLink":
                case "soundcloudLink":
                case "websiteLink":
                case "videoLink":
                    if (!isEmpty(value)){
                        if (!isURL(value, {allow_underscores: true})) errorMessage = "* Nieprawidłowy adres url"
                        else errorMessage = "";
                    }
                    else errorMessage = "";
                    break;
                default:
                    break;
            }
            newErrors[slug] = errorMessage;
        })
        this.props.handleUpdate(
            "errors",
            {
                ...errors,
                ...newErrors
            }
        )
        // console.log(newErrors);

        return !Object.keys(newErrors).some((key) => newErrors[key])
    }

    handleBlur = (e) => {
        this.evaluateFields([e.target.id]);
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     const { errors } = this.state;
    //     console.log(this.evaluateFields(["email"]));
    //
    //     if (this.evaluateFields(["email"])) {
    //         if (!Object.keys(errors).some((key) => errors[key])) {
    //             this.props.forgotPassword(this.state.email);
    //         }
    //     }
    // }

    handleAdd = (slug, imageSlug, imageUrl, image) => {
        this.props.handleUpdate(slug, imageUrl);
        this.props.handleUpdate(imageSlug, image);
    }

    handleDelete = (slug, fileSlug, _, __, ___) => {
        this.props.handleUpdate(slug, undefined);
        this.props.handleUpdate(fileSlug, undefined);
        console.log("usuwanie")
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
                    <Col className={"p-0"} style={{width: "100%"}}>
                        <h6 className={"mb-4"}>Zdjęcie&nbsp;profilowe</h6>
                        <BlocksImage
                            type={"single"}
                            elementsList={state.profilePhotoSrc}
                            slug={"profilePhotoSrc"}
                            fileSlug={"profilePhoto"}
                            addHandler={this.handleAdd}
                            deleteHandler={this.handleDelete}
                        />
                    </Col>
                </Form.Group>

                <h6 className={"mb-4 mt-2"}>Linki</h6>
                <div id={"links"} className={"mb-5 block"}>
                    <div className={"d-flex flex-row align-items-center mb-3"}>
                        <FontAwesomeIcon icon={faFacebook} className={"mr-3"}/>
                        <Form.Group className={"block mt-2 mb-2 text-left animated-label"}>
                            <Form.Control
                                id={"facebookLink"}
                                type={"text"}
                                // placeholder={"Facebook"}
                                className={state.facebookLink ? "not-empty" : ""}
                                value={state.facebookLink}
                                size="sm"
                                autoComplete={"off"}
                                maxLength={"2083"}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={state.errors.facebookLink}
                            />
                            <Form.Label>Facebook</Form.Label>
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.facebookLink}</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className={"d-flex flex-row align-items-center mb-3"}>
                        <FontAwesomeIcon icon={faYoutube} className={"mr-3"}/>
                        <Form.Group className={"block mt-2 mb-2 text-left animated-label"}>
                            <Form.Control
                                id={"youtubeLink"}
                                type={"text"}
                                // placeholder={"Youtube"}
                                className={state.youtubeLink ? "not-empty" : ""}
                                value={state.youtubeLink}
                                size="sm"
                                autoComplete={"off"}
                                maxLength={"2083"}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={state.errors.youtubeLink}
                            />
                            <Form.Label>Youtube</Form.Label>
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.youtubeLink}</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className={"d-flex flex-row align-items-center mb-3"}>
                        <FontAwesomeIcon icon={faInstagram} className={"mr-3"}/>
                        <Form.Group className={"block mt-2 mb-2 text-left animated-label"}>
                            <Form.Control
                                id={"instagramLink"}
                                type={"text"}
                                // placeholder={"Instagram"}
                                className={state.instagramLink ? "not-empty" : ""}
                                value={state.instagramLink}
                                size="sm"
                                autoComplete={"off"}
                                maxLength={"2083"}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={state.errors.instagramLink}
                            />
                            <Form.Label>Instagram</Form.Label>
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.instagramLink}</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className={"d-flex flex-row align-items-center mb-3"}>
                        <FontAwesomeIcon icon={faSoundcloud} className={"mr-3"}/>
                        <Form.Group className={"block mt-2 mb-2 text-left animated-label"}>
                            <Form.Control
                                id={"soundcloudLink"}
                                type={"text"}
                                // placeholder={"SoundCloud"}
                                className={state.soundcloudLink ? "not-empty" : ""}
                                value={state.soundcloudLink}
                                size="sm"
                                autoComplete={"off"}
                                maxLength={"2083"}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={state.errors.soundcloudLink}
                            />
                            <Form.Label>SoundCloud</Form.Label>
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.soundcloudLink}</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className={"d-flex flex-row align-items-center mb-3"}>
                        <FontAwesomeIcon icon={faGlobeAmericas} className={"mr-3"}/>
                        <Form.Group className={"block mt-2 mb-2 text-left animated-label"}>
                            <Form.Control
                                id={"websiteLink"}
                                type={"text"}
                                // placeholder={"Strona"}
                                className={state.websiteLink ? "not-empty" : ""}
                                value={state.websiteLink}
                                size="sm"
                                autoComplete={"off"}
                                maxLength={"2083"}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={state.errors.websiteLink}
                            />
                            <Form.Label>Strona</Form.Label>
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.websiteLink}</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                </div>

                <h6 className={"mb-4 mt-2"}>Opis</h6>
                <Form.Control
                    id={"description"}
                    as={"textarea"}
                    rows={5}
                    // placeholder={"Opis"}
                    maxLength={"1000"}
                    defaultValue={profile && profile.description}
                    size="sm"
                    className={"mb-5"}
                    onChange={this.handleChange}
                />

                <h6 className={"mb-4 mt-3"}>Nagrania</h6>
                <BlocksRecords
                    elementsList={state.recordingsSrc.concat(state.recordingsSrcNew)}
                    srcSlug={"recordingsSrc"}
                    slug={"recordingsSrcNew"}
                    fileSlug={"recordingsNew"}
                    deletedSlug={"recordingsDeleted"}
                    addHandler={this.handleImageArrayAdd}
                    deleteHandler={this.handleImageArrayDelete}
                />

                <h6 className={"mb-4 mt-3"}>Galeria</h6>
                <BlocksImage
                    type={"multiple"}
                    elementsList={state.gallerySrc.concat(state.gallerySrcNew)}
                    srcSlug={"gallerySrc"}
                    slug={"gallerySrcNew"}
                    fileSlug={"galleryNew"}
                    deletedSlug={"galleryDeleted"}
                    addHandler={this.handleImageArrayAdd}
                    deleteHandler={this.handleImageArrayDelete}
                />

                <h6 className={"mb-4 mt-3"}>Film</h6>
                <div className={"block d-flex flex-row align-items-center mb-5"}>
                    <FontAwesomeIcon icon={faLink} className={"mr-3"}/>
                    <Form.Group className={"block mt-2 mb-2 text-left animated-label"}>
                        <Form.Control
                            id={"videoLink"}
                            type={"text"}
                            // placeholder={"Link do filmu"}
                            className={state.videoLink ? "not-empty" : ""}
                            value={state.videoLink}
                            size="sm"
                            autoComplete={"off"}
                            maxLength={"2083"}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            isInvalid={state.errors.videoLink}
                        />
                        <Form.Label>Link do filmu</Form.Label>
                        <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.videoLink}</Form.Control.Feedback>
                    </Form.Group>
                </div>
            </Form.Group>
        );
    }
}

export default ProfileDataFormGroup;