import React, { Component } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import cloneDeep from 'lodash/cloneDeep';

import "../../../resources/styles/modal_style.css";

import Blocks from "./Blocks";
import BlocksMembers from "./BlocksMembers";
import Dropdown from "./DropdownInput";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import BlocksStatus from "./BlocksStatus";

class PersonalDataFormGroup extends Component{
    state = {
        currentMember: '',

        statusError: '',

        modalShow: false,
        actualPassword: '',
        isPasswordCorrect: false,
        newPassword: '',
        newPasswordRep: ''
    }

    handleChange = (e) => {
        this.props.handleUpdate(e.target.id, e.target.value);
    }

    handleLocalChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleDelete = (slug, item) => {
        let elements = this.props.state[slug];
        let index = elements.indexOf(item)
        if (index !== -1) {
            elements.splice(index, 1);
            this.props.handleUpdate(slug, elements);
            this.setState({ statusError: "" });
        }
    }

    toggleSelected = (id, item, slug, isMultiple) => {
        if (!isMultiple) {
            this.props.handleUpdate(slug, cloneDeep(item));
        } else {
            let elements = this.props.state[slug];

            if (slug === "status") {
                if (!elements.some( elem => elem.id === item.id)) elements.unshift(cloneDeep(item));
                else {
                    if (elements.find( elem => elem.id === item.id).withInstrument) {
                        if (elements.find(elem => elem.id === item.id).instrument) elements.unshift(cloneDeep(item));
                        else {
                            this.setState({statusError: "Aby dodać kolejny status musisz wybrać instrument"});
                        }
                    }
                }
            } else
                if (!elements.includes(item)) elements.unshift(item);

            this.props.handleUpdate(slug, elements);
        }
    }

    blockInput = (title, slug) => {
        let list = this.props[slug];

        return (
            <Form.Group className={"list-select mb-5"} style={{width: "100%"}}>
                <h6 className={"mb-3"}>{title}</h6>

                <div className={"block mb-3"}>
                    <Dropdown placeholder="Wybierz z listy" list={list} slug={slug} toggleItem={this.toggleSelected} isMultiple={true}/>
                </div>

                <Blocks elementsList={this.props.state[slug]} align={"start"} editable={true} slug={slug} handler={this.handleDelete} flex_1={true}/>
            </Form.Group>
        )
    }

    handleAddMember = () => {
        let currentMember = this.state.currentMember.trim();
        let members = this.props.state.members;

        if (currentMember !== ""){
            members.unshift(
                {
                    name: currentMember,
                    user: ""
                });
            this.props.handleUpdate("members", members);
            this.setState({ currentMember: '' })
            document.getElementById("currentMember").value = "";
        }
    }

    handleLinkingMember = (slug, operation, index, login) => {
        let elements = this.props.state[slug];
        const { usersArtists } = this.props;

        switch (operation){
            case "add":
                let linkedUser = usersArtists && usersArtists.find(user => user.login === login);
                if (linkedUser) {
                    elements[index].user = linkedUser;
                    this.props.handleUpdate(slug, elements);
                    return true;
                } else
                    return false;
            case "delete":
                elements[index].user = "";
                this.props.handleUpdate(slug, elements);
                return true;
            default:
                break;
        }
    }

    membersInput = () => {
        return (
            <Form.Group className={"mb-5"} style={{width: "100%"}}>
                <h6 className={"mb-2"}>Członkowie</h6>
                <div className={"d-flex flex-row mb-3"}>
                    <Form.Control id={"currentMember"} type={"text"} placeholder={"Pseudonim"} onChange={this.handleLocalChange} size="sm" className={"mr-2"} autoComplete={"off"}/>
                    <Button variant="outline-accent" size="sm" onClick={this.handleAddMember}>Dodaj</Button>
                </div>
                <BlocksMembers elementsList={this.props.state.members} align={"start"} editable={true} slug={"members"}
                               handler={this.handleDelete} linkingHandler={this.handleLinkingMember} flex_1={true}/>
            </Form.Group>
        )
    }

    handleStatusInstrument = (slug, index, instrument) => {
        let elements = this.props.state[slug];
        let statusElement = elements[index];

        if (elements.some(elem => statusElement.id === elem.id && elem.instrument && elem.instrument.id === instrument.id))
            this.setState({statusError: "Status z wybranym instrumentem został już dodany"});
        else {
            elements[index].instrument = instrument;
            this.setState({ statusError: "" });
            this.props.handleUpdate(slug, elements);
        }
    }

    statusInput = () => {
        const list = this.props.statusFiltered;
        const { statusError } = this.state;

        return (
            <Form.Group className={"mb-5"} style={{width: "100%"}}>
                <h6 className={"mb-2"}>Status</h6>
                <div className={"block mb-3"}>
                    <Dropdown placeholder="Wybierz z listy" list={list} slug={"status"} toggleItem={this.toggleSelected} isMultiple={true}/>
                </div>
                { statusError
                    ? <p className={"error mb-3"}>{statusError}</p>
                    : ""
                }
                <BlocksStatus elementsList={this.props.state.status} instrumentList={this.props.instruments} slug={"status"}
                               deleteHandler={this.handleDelete} instrumentHandler={this.handleStatusInstrument}/>
            </Form.Group>
        )
    }

    checkActualPassword = () => {
        let isCorrect = true;
        console.log(this.state.actualPassword);

        this.setState({isPasswordCorrect: isCorrect})
    }

    saveNewPassword = () => {
        console.log(this.state.newPassword);
        console.log(this.state.newPasswordRep);

        this.setState({modalShow: false, isPasswordCorrect: false});
    }

    displayPasswordEdit = () => {
        const { modalShow, isPasswordCorrect } = this.state;

        return (
            <Modal
                show={modalShow}
                onHide={() => this.setState({modalShow: false, isPasswordCorrect: false})}
                size="md"
                centered>
                <Modal.Header closeButton className={"d-flex flex-row justify-content-center"}>
                    <h5>Zmiana hasła</h5>
                </Modal.Header>
                <Modal.Body className={"d-flex flex-row justify-content-center"}>
                    {!isPasswordCorrect ?
                        <Form.Control id={"actualPassword"} type={"password"} placeholder={"Aktualne hasło"} onChange={this.handleChange} size="sm" className={"mb-4"} style={{width: "60%"}}/>
                        :
                        <div className={"d-flex flex-column align-items-center"} style={{width: "100%"}}>
                            <Form.Control id={"newPassword"} type={"password"} placeholder={"Nowe hasło"} onChange={this.handleChange} size="sm" className={"mb-4"} style={{width: "60%"}}/>
                            <Form.Control id={"newPasswordRep"} type={"password"} placeholder={"Powtórz hasło"} onChange={this.handleChange} size="sm" className={"mb-4"} style={{width: "60%"}}/>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer className={"justify-content-center"}>
                    {!isPasswordCorrect ?
                        <Button variant="outline-accent" size="sm" onClick={this.checkActualPassword}>Zatwierdź</Button>
                        :
                        <Button variant="outline-accent" size="sm" onClick={this.saveNewPassword}>Zapisz zmiany</Button>
                    }
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        let userType;

        const type1 = {type: "artysta", typeSlug: "artist", nameFieldText: "Pseudonim"}
        const type2 = {type: "zespol", typeSlug: "band", nameFieldText: "Nazwa zespołu"}

        const { type, operation = "create", user = undefined, state, auth, voivodeships, voivodeshipsOrdered, statusFiltered, genres, instruments } = this.props;

        if (type === type1.typeSlug) userType = type1;
        else if (type === type2.typeSlug) userType = type2;

        const isEdit = operation === "edit" && user;

        if (!statusFiltered || !voivodeships || !voivodeshipsOrdered || !instruments || !genres) return ""

        return (
            <Form.Group className={"d-flex flex-column align-items-center"}>
                <Form.Control id={"login"} type={"text"} placeholder={"Login"} defaultValue={isEdit ? user.login : ""} onChange={this.handleChange} size="sm" className={"mb-4"} autoComplete={"off"}/>
                <Form.Control id={"email"} type={"email"} placeholder={"Email"} defaultValue={isEdit ? auth.email : ""} onChange={this.handleChange} size="sm" className={"mb-4"} autoComplete={"off"}/>

                {operation === "create" ?
                    <>
                        <Form.Control id={"password"} type={"password"} placeholder={"Hasło"} onChange={this.handleChange} size="sm" className={"mb-4"}/>
                        <Form.Control id={"passwordRep"} type={"password"} placeholder={"Powtórz hasło"} onChange={this.handleChange} size="sm" className={"mb-5"}/>
                    </>
                    : ""
                }

                {operation === "edit" ?
                    <>
                        <Button block variant="outline-white" size="sm" className={"mt-2 mb-5"} onClick={() => this.setState({modalShow: true})}>Zmień hasło</Button>
                        {this.displayPasswordEdit()}
                    </>
                    : ""
                }

                <Form.Control id={"name"} type={"text"} placeholder={userType.nameFieldText} defaultValue={isEdit ? user.name : ""} onChange={this.handleChange} size="sm" className={"mb-4"} autoComplete={"off"}/>
                <div className={"block mb-4"}>
                    <Dropdown placeholder={"Województwo"} defaultValue={isEdit ? voivodeships[user.voivodeshipId].name : ""} value={state.voivodeship} list={voivodeshipsOrdered} slug={"voivodeship"}
                              toggleItem={this.toggleSelected} />
                </div>
                <Form.Control id={"city"} type={"text"} placeholder={"Miasto"} defaultValue={isEdit ? user.city : ""} onChange={this.handleChange} size="sm" className={"mb-5"} autoComplete={"off"}/>
                { this.blockInput("Gatunki", "genres") }
                { userType.typeSlug === "artist" ? this.blockInput("Instrumenty", "instruments") : this.membersInput() }
                { this.statusInput() }
            </Form.Group>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        voivodeships: state.firestore.data.voivodeships,
        voivodeshipsOrdered: state.firestore.ordered.voivodeships,
        genres: state.firestore.ordered.genres,
        instruments: state.firestore.ordered.instruments,
        statusFiltered: state.firestore.ordered.statusFiltered,
        usersArtists: state.firestore.ordered.usersArtists
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {collection: "voivodeships", orderBy: "name"},
        {collection: "genres", orderBy: "name"},
        {collection: "instruments", orderBy: "name"},
        {collection: "status", where: ["type", "in", [props.type, "all"]], storeAs: "statusFiltered"},
        {collection: "users", where: ["isArtist", "==", true], storeAs: "usersArtists"}
    ])
)(PersonalDataFormGroup);