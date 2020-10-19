import React, { Component } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

import "../../../resources/styles/modal_style.css";

import Blocks from "./Blocks";
import BlocksMembers from "./BlocksMembers";
import Dropdown from "./DropdownInput";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";

class PersonalDataFormGroup extends Component{
    state = {
        genres: [],
        instruments: [],

        currentMember: '',
        members: [],

        status: [],

        modalShow: false,
        actualPassword: '',
        isPasswordCorrect: false,
        newPassword: '',
        newPasswordRep: ''
    }

    handleChange = (e) => {
        this.props.handleUpdate(e.target.id, e.target.value);
    }

    handleDelete = (slug, value) => {
        let elements = this.props.state[slug];
        let index = elements.indexOf(value)
        if (index !== -1) {
            elements.splice(index, 1);
            this.props.handleUpdate(slug, elements);
        }
    }

    handleAddMember = () => {
        let currentMember = this.state.currentMember.trim();
        let members = this.props.state.members;

        if (currentMember !== ""){
            members.push(
                {
                    name: currentMember,
                    userId: ""
                });
            console.log(members);

            this.props.handleUpdate("members", members);

            this.setState({
                // members: members,
                currentMember: ''
            })
            document.getElementById("currentMember").value = "";
        }
    }

    handleLinking = (slug, operation, index, userId) => {
        let elements = this.state[slug];
        switch (operation){
            case "add":
                console.log(elements[index]);
                elements[index].userId = userId;
                break;
            case "delete":
                elements[index].userId = "";
                break;
            default:
        }

        this.props.handleUpdate(slug, elements);

        // this.setState({
        //     [slug]: elements
        // })
    }

    toggleSelected = (id, name, slug, isMultiple) => {
        if (!isMultiple) {
            this.props.handleUpdate(slug, name);
        } else {
            let elements = this.props.state[slug];
            if (!elements.includes(name)) elements.push(name);

            this.props.handleUpdate(slug, elements);

            // this.setState({
            //     [slug]: elements
            // })
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

                <Blocks elementsList={this.props.state[slug]} align={"start"} editable={true} slug={slug} handler={this.handleDelete}/>
            </Form.Group>
        )
    }

    membersInput = () => {
        return (
            <Form.Group className={"mb-5"} style={{width: "100%"}}>
                <h6 className={"mb-2"}>Członkowie</h6>
                <div className={"d-flex flex-row mb-3"}>
                    <Form.Control id={"currentMember"} type={"text"} placeholder={"Pseudonim"} onChange={this.handleChange} size="sm" className={"mr-2"}/>
                    <Button variant="outline-accent" size="sm" onClick={this.handleAddMember}>Dodaj</Button>
                </div>
                <BlocksMembers elementsList={this.state.members} align={"start"} editable={true} slug={"members"} handler={this.handleDelete} linkingHandler={this.handleLinking}/>
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

        const type1 = {type: "artysta", nameFieldText: "Pseudonim"}
        const type2 = {type: "zespol", nameFieldText: "Nazwa zespołu"}

        const { type, operation = "create", user = undefined, state, voivodeships } = this.props;

        if (type === type1.type) userType = type1;
        else if (type === type2.type) userType = type2;

        const isEdit = operation === "edit" && user;


        return (
            <Form.Group className={"d-flex flex-column align-items-center"}>
                {/*<Form.Control id={"login"} type={"text"} placeholder={"Login"} defaultValue={isEdit ? user.login : ""} onChange={this.handleChange} size="sm" className={"mb-4"}/>*/}
                <Form.Control id={"email"} type={"email"} placeholder={"Email"} defaultValue={isEdit ? user.email : ""} onChange={this.handleChange} size="sm" className={"mb-4"}/>

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

                <Form.Control id={"name"} type={"text"} placeholder={userType.nameFieldText} defaultValue={isEdit ? user.name : ""} onChange={this.handleChange} size="sm" className={"mb-4"}/>
                <div className={"block mb-4"}>
                    <Dropdown placeholder={"Województwo"} value={state.voivodeship} list={voivodeships} slug={"voivodeship"}
                              toggleItem={this.toggleSelected} />
                </div>
                <Form.Control id={"city"} type={"text"} placeholder={"Miasto"} defaultValue={isEdit ? user.city : ""} onChange={this.handleChange} size="sm" className={"mb-5"}/>
                { this.blockInput("Gatunki", "genres") }
                { userType.type === "artysta" ? this.blockInput("Instrumenty", "instruments") : this.membersInput() }
                {/*{ this.blockInput("Status", "status") }*/}
            </Form.Group>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        voivodeships: state.firestore.ordered.voivodeships,
        genres: state.firestore.ordered.genres,
        instruments: state.firestore.ordered.instruments
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['voivodeships', 'genres', 'instruments'])
)(PersonalDataFormGroup);