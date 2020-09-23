import React, { Component } from 'react';

import {X, Check2} from 'react-bootstrap-icons';
import {Button, Form} from "react-bootstrap";

class BlockMemberElement extends Component{
    state = {
        isLinking: false
    }

    linkingUserComponent = (elem) => {
        return (
            <div className={"find-member block d-flex flex-row align-items-center mx-5 mb-3 p-2"} style={{border: "3px solid var(--background-lighter)"}}>
                <Form.Control id={"user-email-"+elem} type={"text"} placeholder={"Email użytkownika"} onChange={this.handleChange} size="sm"/>
                <Check2 size={25} className={"clickable ml-2"}/>
            </div>
        )
    }

    displayLinking = () => {
        this.setState({
            isLinking: !this.state.isLinking
        })
    }

    render() {
        const { isLinking } = this.state;
        const { elem, editable, slug, buttonText, handler, linkingHandler } = this.props;

        return (
            <>
                <div className={"block d-flex flex-row align-items-center background-lighter mb-2 py-2" + (editable ? " pl-3 pr-2" : " px-3")}>
                    <p>{elem}</p>
                    <Button variant="outline-white" onClick={this.displayLinking} size="sm" className={"ml-auto"} style={{fontSize: "0.8rem"}}>{buttonText}</Button>
                    {editable ? <X className={"clickable ml-2"} size={25} onClick={()=>handler(slug, elem)}/> : ""}
                </div>
                {isLinking ? this.linkingUserComponent(elem) : "" }
            </>
        );
    }
}

export default BlockMemberElement;