import React, { Component } from 'react';
import {Button, Form} from "react-bootstrap";
import emailjs from "emailjs-com";
import isEmpty from "validator/es/lib/isEmpty";
import isEmail from "validator/es/lib/isEmail";

class MessageForm extends Component{
    state = {
        name: (this.props.userFrom && this.props.userFrom.name) || "",
        email: (this.props.userFrom && this.props.userFrom.email) || "",
        subject: '',
        message: '',

        errors: {}
    }

    handleChange = (e) => {
        const { id, value } = e.target;
        const { errors } = this.state;

        this.setState({
            [id]: value
        })

        if (errors[id]) {
            this.setState({
                errors: {
                    ...errors,
                    [id]: ""
                }
            });
        }
    }

    handleBlur = (e) => {
        this.evaluateFields([e.target.id]);
    }

    evaluateFields = (slugs) => {
        const { errors } = this.state;
        let newErrors = {};

        slugs.forEach(slug => {
            const value = this.state[slug];
            let errorMessage = "";

            if (isEmpty(value)) {
                errorMessage = "* Wymagane pole";
            }
            else {
                switch (slug) {
                    case "email":
                        if (!isEmail(value)) errorMessage = "* Nieprawidłowy adres email"
                        else errorMessage = "";
                        break;
                    default:
                        break;
                }
            }
            newErrors[slug] = errorMessage;
        })

        this.setState({
            errors: {
                ...errors,
                ...newErrors
            }
        })

        return !Object.keys(newErrors).some((key) => newErrors[key])
    }

    handleSendMessage = (e) => {
        e.preventDefault();
        const { errors } = this.state;

        if (this.evaluateFields(["name", "email", "subject", "message"])){
            if (!Object.keys(errors).some((key) => errors[key])) {
                emailjs.sendForm('gmail', 'users_contact_template', e.target, 'user_W1PcscGeAalQnDU1stttN')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
                e.target.reset();
                this.props.closeModal();
            }
        }
        this.props.scrollToTop();
    }

    render() {
        const { name, email, subject, errors } = this.state;
        const { userTo } = this.props;

        return (
            <Form className={"block p-3 d-flex flex-column align-items-center"} onSubmit={this.handleSendMessage}>
                <Form.Group className={"block mb-4 text-left animated-label"}>
                    <Form.Control
                        id={"name"}
                        name={"name"}
                        type={"text"}
                        className={name ? "not-empty" : ""}
                        value={name}
                        size="sm"
                        autoComplete={"off"}
                        maxLength={"100"}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        isInvalid={errors.name}
                    />
                    <Form.Label>Imię i nazwisko</Form.Label>
                    <Form.Control.Feedback type="invalid" className={"text-left"}>{this.state.errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={"block mb-4 mt-2 text-left animated-label"}>
                    <Form.Control
                        id={"email"}
                        name={"email"}
                        type={"email"}
                        className={email ? "not-empty" : ""}
                        value={email}
                        size="sm"
                        autoComplete={"off"}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        isInvalid={errors.email}
                    />
                    <Form.Label>Email</Form.Label>
                    <Form.Control.Feedback type="invalid" className={"text-left"}>{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={"block mb-5 mt-2 text-left animated-label"}>
                    <Form.Control
                        id={"subject"}
                        name={"subject"}
                        type={"text"}
                        className={subject ? "not-empty" : ""}
                        size="sm"
                        autoComplete={"off"}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        isInvalid={errors.subject}
                    />
                    <Form.Label>Temat</Form.Label>
                    <Form.Control.Feedback type="invalid" className={"text-left"}>{errors.subject}</Form.Control.Feedback>
                </Form.Group>

                <h6 className={"mb-3"}>Treść</h6>
                <Form.Group className={"block mb-5"}>
                    <Form.Control
                        id={"message"}
                        name={"message"}
                        as={"textarea"}
                        rows={5}
                        maxLength={"1000"}
                        size="sm"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        isInvalid={errors.message}
                    />
                    <Form.Control.Feedback type="invalid" className={"text-left"}>{errors.message}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={"block mb-5 d-none"}>
                    <Form.Control
                        id={"to_name"}
                        name={"to_name"}
                        type={"text"}
                        size="sm"
                        value={userTo.name}
                        readOnly
                        hidden
                    />
                </Form.Group>
                <Form.Group className={"block mb-5 d-none"}>
                    <Form.Control
                        id={"to_email"}
                        name={"to_email"}
                        type={"text"}
                        size="sm"
                        value={userTo.email}
                        readOnly
                        hidden
                    />
                </Form.Group>

                <Button variant="outline-accent" size="sm" type={"submit"} className={"px-4"}>Wyślij</Button>
            </Form>
        );
    }
}

export default MessageForm;