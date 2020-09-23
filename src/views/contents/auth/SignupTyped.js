import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import Blocks from "../profiles/Blocks";
import BlocksMembers from "../profiles/BlocksMembers";

class SignupTyped extends Component{
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
        members: [{name: "Anna Kowalska", userId: ""}],
        agreement: false
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

        } else if (e.target.type === "checkbox") {
            this.setState({
                [e.target.id]: e.target.checked
            })
        } else {
            this.setState({
                [e.target.id]: e.target.value
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
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
        console.log(elements);
        console.log(index);

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
                <h6 className={"mb-2"}>{title}</h6>
                <Form.Control id={slug} as={"select"} value={-1} placeholder={title} onChange={this.handleChange} size="sm" className={"mb-3 dark-text"}>
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
        let signupType;
        const type1 = {
            type: "artysta",
            title: "Artysta",
            nameFieldText: "Pseudonim"
        }
        const type2 = {
            type: "zespol",
            title: "Zespół",
            nameFieldText: "Nazwa zespołu"
        }

        const { type } = this.props.match.params;

        if (type === type1.type) signupType = type1
        else if (type === type2.type) signupType = type2
        else return "404"

        return (
            <div id={"signup-artist"} className={"page-content"}>
                <Container>
                    <Row className={"section section-card d-flex flex-column align-items-center"}>
                        <Col className={"background-light p-3 p-sm-5 my-2 my-sm-5 text-center"} xs={11} sm={10} md={8} lg={6}>
                            <h3 className={"mb-2"}>Rejestracja</h3>
                            <h6 className={"mb-5"}>{signupType.title}</h6>

                            <Form onSubmit={this.handleSubmit} style={{width: "100%"}}>
                                <Form.Group className={"d-flex flex-column align-items-center"}>
                                    <Form.Control id={"login"} type={"text"} placeholder={"Login"} onChange={this.handleChange} size="sm" className={"mb-3"}/>
                                    <Form.Control id={"email"} type={"email"} placeholder={"Email"} onChange={this.handleChange} size="sm" className={"mb-3"}/>
                                    <Form.Control id={"password"} type={"password"} placeholder={"Hasło"} onChange={this.handleChange} size="sm" className={"mb-3"}/>
                                    <Form.Control id={"passwordRep"} type={"password"} placeholder={"Powtórz hasło"} onChange={this.handleChange} size="sm" className={"mb-5"}/>

                                    <Form.Control id={"name"} type={"text"} placeholder={signupType.nameFieldText} onChange={this.handleChange} size="sm" className={"mb-3"}/>
                                    <Form.Control id={"voivodeship"} type={"text"} placeholder={"Województwo"} onChange={this.handleChange} size="sm" className={"mb-3"}/>
                                    <Form.Control id={"city"} type={"text"} placeholder={"Miasto"} onChange={this.handleChange} size="sm" className={"mb-5"}/>

                                    {this.blockInput("Gatunki", "genres")}
                                    {signupType.type==="artysta" ?
                                        this.blockInput("Instrumenty", "instruments")
                                        :
                                        this.membersInput()
                                    }

                                    <div className="checkbox-container align-self-start d-flex flex-row mb-3">
                                        <input type={"checkbox"} id={"agreement"} value={"true"} onChange={this.handleChange}/>
                                        {/*<span className="checkbox-custom circular"/>*/}
                                        <p className={"ml-4 pl-1"}>Akceptuję <Link to="/regulamin" className={"underline"}>regulamin</Link></p>
                                    </div>

                                    <Button block type="submit" variant="outline-accent" size="sm" className={"mb-3"}>Załóż konto</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SignupTyped;