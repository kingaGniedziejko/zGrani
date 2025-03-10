import React, { Component } from 'react';

import {X, Check2, ExclamationCircle} from 'react-bootstrap-icons';
import {Button, Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import isEmpty from "validator/es/lib/isEmpty";
import {Link} from "react-router-dom";

class BlocksMembersElement extends Component{
    state = {
        isLinking: false,
        userLogin: "",
        isLinked: false,
        linkingError: false,
        linkingErrorMessage: ""
    }

    displayLinking = () => {
        this.setState({
            isLinking: !this.state.isLinking
        })
    }

    handleChange = (e) => {
        this.setState({
            userLogin: e.target.value,
            linkingError: false,
            linkingErrorMessage: ""
        })
    }

    handleCheck = () => {
        let login = this.state.userLogin;

        if (isEmpty(login)){
            this.setState({
                linkingError: true,
                linkingErrorMessage: "* Należy podać unikalny login aktywnego użytkownika aplikacji - artysty"
            })
        } else {
            let errorMessage = this.props.linkingHandler(this.props.slug, this.props.index, login)
            if (errorMessage === "") {
                this.setState({
                    isLinked: true,
                    isLinking: false,
                    linkingError: false,
                    linkingErrorMessage: "",
                    userLogin: ""
                })
            } else {
                this.setState({
                    linkingError: true,
                    linkingErrorMessage: errorMessage
                })
            }
        }
    }

    handleExit = () => {
        this.setState({
            isLinked: false,
            userLogin: "",
            isLinking: false,
            linkingError: false
        })
        // document.getElementById("user-login-" + this.props.index).value = "";
        // this.props.linkingHandler(this.props.slug, "delete", this.props.index);
    }

    render() {
        const { isLinking, linkingError, linkingErrorMessage } = this.state;
        const { elem, editable, slug, handler } = this.props;

        const renderTooltip = (props) => <Tooltip id="login-tooltip" {...props}>{elem.user.login}</Tooltip>;

        return (
            <>
                <div className={"block d-flex flex-row align-items-center background-lighter mb-2 py-2" + (editable ? " pl-3 pr-2" : " px-3")}>
                    <p>{elem.user ? elem.user.name : elem.name}</p>
                    { editable ?
                        ( elem.user ?
                            <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                                <small className={"text-italic accent-text ml-auto"}>Załączono</small>
                            </OverlayTrigger>
                                :
                            <Button variant="outline-white" onClick={this.displayLinking} size="sm" className={"ml-auto"} style={{fontSize: "0.8rem"}}>
                                Załącz profil
                            </Button>
                        )
                        :
                        <Link to={"/profil/" + elem.user.id } className="mt-1 mt-md-0 ml-auto">
                            <Button block variant="outline-white" size="sm" onClick={this.props.logout}>Odwiedź profil</Button>
                        </Link>
                    }
                    {editable ? <X className={"clickable ml-2"} size={25} onClick={()=>handler(slug, elem)}/> : ""}
                </div>


                {isLinking ?
                    <div className={"find-member block d-flex flex-column mb-3 px-2 py-1 pt-2"} style={{border: "3px solid var(--background-lighter)"}}>
                        <div className={"find-member block d-flex flex-row align-items-center"}>
                            <Form.Group className={"block mb-3 mt-3 text-left animated-label"}>
                                <Form.Control
                                    id={"user-login-" + this.props.index}
                                    type={"text"}
                                    className={this.state.userLogin ? "not-empty" : ""}
                                    value={this.state.userLogin}
                                    // placeholder={"Login użytkownika"}
                                    size="sm"
                                    autoComplete={"off"}
                                    onChange={this.handleChange}
                                    isInvalid={linkingError}
                                />
                                <Form.Label>Login użytkownika</Form.Label>
                                <Form.Control.Feedback type="invalid" className={"text-left"} as={"small"}>{linkingErrorMessage}</Form.Control.Feedback>
                            </Form.Group>
                            <Check2 onClick={this.handleCheck} size={25} className={"clickable ml-3"}/>
                            <X onClick={this.handleExit} size={28} className={"clickable ml-2"}/>
                        </div>
                        {/*{ linkingError ? <p className={"error mt-2 text-left"}>* Nie ma takiego artysty</p> : "" }*/}
                    </div>
                    : "" }
            </>
        );
    }
}


export default BlocksMembersElement;