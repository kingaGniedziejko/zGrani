import React, { Component } from 'react';
import {Button, Form} from "react-bootstrap";

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
        members: []
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


    render() {
        let userType;
        const type1 = {
            type: "artysta",
            nameFieldText: "Pseudonim"
        }
        const type2 = {
            type: "zespol",
            nameFieldText: "Nazwa zespołu"
        }

        const { type, operation } = this.props;

        if (type === type1.type) userType = type1
        else if (type === type2.type) userType = type2

        return (
            <Form.Group className={"d-flex flex-column align-items-center"}>
                <Form.Control id={"login"} type={"text"} placeholder={"Login"} onChange={this.handleChange} size="sm" className={"mb-4"}/>
                <Form.Control id={"email"} type={"email"} placeholder={"Email"} onChange={this.handleChange} size="sm" className={"mb-4"}/>
                <Form.Control id={"password"} type={"password"} placeholder={"Hasło"} onChange={this.handleChange} size="sm" className={"mb-4"}/>
                <Form.Control id={"passwordRep"} type={"password"} placeholder={"Powtórz hasło"} onChange={this.handleChange} size="sm" className={"mb-5"}/>

                <Form.Control id={"name"} type={"text"} placeholder={userType.nameFieldText} onChange={this.handleChange} size="sm" className={"mb-4"}/>
                <Form.Control id={"voivodeship"} type={"text"} placeholder={"Województwo"} onChange={this.handleChange} size="sm" className={"mb-4"}/>
                <Form.Control id={"city"} type={"text"} placeholder={"Miasto"} onChange={this.handleChange} size="sm" className={"mb-5"}/>

                {this.blockInput("Gatunki", "genres")}

                {userType.type === "artysta" ?
                    this.blockInput("Instrumenty", "instruments")
                    : this.membersInput()
                }
            </Form.Group>
        );
    }
}

export default PersonalDataFormGroup;