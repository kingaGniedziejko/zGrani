import React, { Component } from 'react';

import {X, Check2} from 'react-bootstrap-icons';
import {Button, Form} from "react-bootstrap";

class BlocksMembersElement extends Component{
    state = {
        isLinking: false,
        userEmail: "",
        isLinked: false
    }

    linkingUserComponent = (elem) => {
        return (
            <div className={"find-member block d-flex flex-row align-items-center mx-5 mb-3 p-2"} style={{border: "3px solid var(--background-lighter)"}}>
                <Form.Control id={"userEmail"} type={"text"} value={this.state.userEmail} placeholder={"Email użytkownika"} onChange={this.handleChange} size="sm"/>
                <Check2 onClick={this.handleCheck} size={25} className={"clickable ml-2"}/>
                <X onClick={this.handleExit} size={28} className={"clickable ml-2"}/>
            </div>
        )
    }

    displayLinking = () => {
        this.setState({
            isLinking: !this.state.isLinking
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleCheck = () => {
        // let email = this.state.userEmail;

        // check if user exists
        let exists = true;
        let userId = "1";

        if (exists){
            this.setState({
                isLinked: true,
                isLinking: false,
            })

            this.props.linkingHandler(this.props.slug, "add", this.props.index, userId);
        } else {
            console.log("Doesn't exist")
        }
    }

    handleExit = () => {
        this.setState({
            isLinked: false,
            userEmail: "",
            isLinking: false
        })
        this.props.linkingHandler(this.props.slug, "delete", this.props.index);
    }

    render() {
        const { isLinking, isLinked } = this.state;
        const { elem, editable, slug, handler } = this.props;

        return (
            <>
                <div className={"block d-flex flex-row align-items-center background-lighter mb-2 py-2" + (editable ? " pl-3 pr-2" : " px-3")}>
                    <p>{elem.name}</p>
                    <Button variant="outline-white" onClick={this.displayLinking} size="sm" className={"ml-auto"} style={{fontSize: "0.8rem"}}>
                        {isLinked ? "Edytuj" : "Załącz profil"}
                    </Button>
                    {editable ? <X className={"clickable ml-2"} size={25} onClick={()=>handler(slug, elem)}/> : ""}
                </div>
                {isLinking ? this.linkingUserComponent(elem) : "" }
            </>
        );
    }
}

export default BlocksMembersElement;