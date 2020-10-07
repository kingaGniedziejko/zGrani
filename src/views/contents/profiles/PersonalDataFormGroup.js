import React, { Component } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

import "../../../resources/styles/modal_style.css";

import Blocks from "./Blocks";
import BlocksMembers from "./BlocksMembers";

class PersonalDataFormGroup extends Component{
    state = {
        login: '',
        email: '',
        password: '',
        passwordRep: '',
        name: '',
        voivodeship: '',
        city: '',
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

    handleDelete = (slug, value) => {
        let elements = this.state[slug];
        let index = elements.indexOf(value)
        if (index !== -1) {
            elements.splice(index, 1);
            this.setState({[slug]: elements});
        }
    }

    handleAddMember = () => {
        let currentMember = this.state.currentMember.trim();
        let members = this.state.members;

        if (currentMember !== ""){
            members.push(
                {
                    name: currentMember,
                    userId: ""
                });
            console.log(members);
            this.setState({
                members: members,
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

        this.setState({
            [slug]: elements
        })
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
                <Blocks elementsList={this.state[slug]} align={"start"} editable={true} slug={slug} handler={this.handleDelete}/>
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
        let userOperation;

        const type1 = {type: "artysta", nameFieldText: "Pseudonim"}
        const type2 = {type: "zespol", nameFieldText: "Nazwa zespołu"}

        const { type, operation } = this.props;

        if (type === type1.type) userType = type1;
        else if (type === type2.type) userType = type2;

        if (operation === undefined) userOperation = "create";
        else userOperation = operation;

        return (
            <Form.Group className={"d-flex flex-column align-items-center"}>
                <Form.Control id={"login"} type={"text"} placeholder={"Login"} onChange={this.handleChange} size="sm" className={"mb-4"}/>
                <Form.Control id={"email"} type={"email"} placeholder={"Email"} onChange={this.handleChange} size="sm" className={"mb-4"}/>

                {userOperation === "create" ?
                    <>
                        <Form.Control id={"password"} type={"password"} placeholder={"Hasło"} onChange={this.handleChange} size="sm" className={"mb-4"}/>
                        <Form.Control id={"passwordRep"} type={"password"} placeholder={"Powtórz hasło"} onChange={this.handleChange} size="sm" className={"mb-5"}/>
                    </>
                    : ""
                }

                {userOperation === "edit" ?
                    <>
                        <Button block variant="outline-white" size="sm" className={"mt-2 mb-5"} onClick={() => this.setState({modalShow: true})}>Zmień hasło</Button>
                        {this.displayPasswordEdit()}
                    </>
                    : ""
                }

                <Form.Control id={"name"} type={"text"} placeholder={userType.nameFieldText} onChange={this.handleChange} size="sm" className={"mb-4"}/>
                <Form.Control id={"voivodeship"} type={"text"} placeholder={"Województwo"} onChange={this.handleChange} size="sm" className={"mb-4"}/>
                <Form.Control id={"city"} type={"text"} placeholder={"Miasto"} onChange={this.handleChange} size="sm" className={"mb-5"}/>

                { this.blockInput("Gatunki", "genres") }
                { userType.type === "artysta" ? this.blockInput("Instrumenty", "instruments") : this.membersInput() }
                { this.blockInput("Status", "status") }
            </Form.Group>
        );
    }
}

export default PersonalDataFormGroup;