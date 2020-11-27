import React, { Component } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import cloneDeep from 'lodash/cloneDeep';

import "../../../resources/styles/modal_style.css";

import Blocks from "../displays/Blocks";
import BlocksMembers from "../displays/BlocksMembers";
import Dropdown from "../inputs/DropdownInput";
import BlocksStatus from "../displays/BlocksStatus";
import { reauthenticate } from "../../../store/actions/authActions";

class PersonalDataFormGroup extends Component{
    state = {
        currentMember: '',
        statusError: '',

        modalShow: false,
        isPasswordCorrect: false,
    }

    static getDerivedStateFromProps(props, prevState) {
        return {
            ...prevState,
            isPasswordCorrect: props.isReauthenticate
        }
    }

    handleChange = (e) => {
        const { id, value } = e.target;
        const { errors } = this.props.state;

        this.props.handleUpdate(id, value);

        if (errors[id]) {
            this.props.handleUpdate("errors", { ...errors, [id]: "" });
        }
    }

    handleBlur = (e) => {
        this.props.evaluateFields([e.target.id]);
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
        const { errors } = this.props.state;

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
                if (!elements.some(elem => elem.id === item.id )) elements.unshift(item);

            this.props.handleUpdate(slug, elements);
        }

        if (errors[slug]) {
            this.props.handleUpdate("errors", { ...errors, [slug]: "" });
        }
    }

    blockInput = (title, slug, dataSlug) => {
        let list = this.props.data[dataSlug];
        let error = this.props.state.errors[slug];

        return (
            <Form.Group className={"list-select mb-5"} style={{width: "100%"}}>
                <h6 className={"mb-1"}>{title}</h6>
                { error ? <p className={"mt-1 error"}>{error}</p> : ""}

                <div className={"block mt-2 mb-3"}>
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
        let newMembers = this.props.state.newMembers;
        const { usersArtists } = this.props.data;
        let linkedUser = usersArtists && usersArtists.find(user => user.login === login);

        switch (operation){
            case "add":
                if (linkedUser) {
                    elements[index].user = linkedUser;
                    newMembers.push(linkedUser.id);
                    this.props.handleUpdate(slug, elements);
                    this.props.handleUpdate("newMembers", newMembers);
                    return true;
                } else
                    return false;
            case "delete":
                elements[index].user = "";

                let memberIndex = newMembers.indexOf(linkedUser.id);
                if (memberIndex !== -1) {
                    elements.splice(memberIndex, 1);
                    this.props.handleUpdate("newMembers", newMembers);
                }

                this.props.handleUpdate(slug, elements);
                return true;
            default:
                break;
        }
    }

    membersInput = () => {
        return (
            <Form.Group className={"mb-5"} style={{width: "100%"}}>
                <h6 className={"mb-3"}>Członkowie</h6>
                <div className={"d-flex flex-row mb-3 text-left animated-label"}>
                    <Form.Control
                        id={"currentMember"}
                        type={"text"}
                        onChange={this.handleLocalChange}
                        size="sm"
                        className={"mr-2"}
                        autoComplete={"off"}
                    />
                    <Form.Label>Pseudonim</Form.Label>
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
        const list = this.props.data.statusFilteredOrdered;
        const { type } = this.props;
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
                <BlocksStatus
                    isArtist={type === "artist"}
                    elementsList={this.props.state.status}
                    instrumentList={this.props.data.instrumentsOrdered}
                    slug={"status"}
                    deleteHandler={this.handleDelete}
                    instrumentHandler={this.handleStatusInstrument}
                />
            </Form.Group>
        )
    }

    checkActualPassword = () => {
        this.props.reauthenticate({
            email: this.props.data.auth.email,
            password: this.props.state.actualPassword
        })
    }

    saveNewPassword = () => {
        console.log(this.props.state.newPassword);
        console.log(this.props.state.newPasswordRep);

        this.setState({modalShow: false, isPasswordCorrect: false});
        this.props.handleUpdate("isNewPasswordSet", true);
    }

    displayPasswordEdit = () => {
        const { modalShow, isPasswordCorrect } = this.state;
        const { state, isReauthenticate } = this.props;

        return (
            <Modal
                show={modalShow}
                onHide={() => this.setState({modalShow: false, isPasswordCorrect: false})}
                size="md"
                centered>
                <Modal.Header closeButton className={"d-flex flex-column align-items-center"}>
                    <h5 className={"mb-2"}>Zmiana hasła</h5>
                    {isReauthenticate === undefined ? "" : (isReauthenticate ? "" : <p className={"error"}>Błędne hasło</p>)}
                </Modal.Header>
                <Modal.Body className={"d-flex flex-column align-items-center"}>
                    {!isPasswordCorrect ?
                        <Form.Group className={"block mb-4 text-left animated-label"} style={{width: "70%"}}>
                            <Form.Control
                                id={"actualPassword"}
                                type={"password"}
                                onChange={this.handleChange}
                                className={state.actualPassword ? "not-empty" : ""}
                                size="sm"
                            />
                            <Form.Label>Aktualne hasło</Form.Label>
                        </Form.Group>
                        :
                        <div className={"d-flex flex-column align-items-center"} style={{width: "100%"}}>
                            <Form.Group className={"block mb-4 text-left animated-label"} style={{width: "70%"}}>
                                <Form.Control
                                    id={"newPassword"}
                                    type={"password"}
                                    className={state.newPassword ? "not-empty" : ""}
                                    size="sm"
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    isInvalid={state.errors.newPassword}
                                />
                                <Form.Label>Nowe hasło</Form.Label>
                                <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.newPassword}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className={"block mb-4 mt-2 text-left animated-label"} style={{width: "70%"}}>
                                <Form.Control
                                    id={"newPasswordRep"}
                                    type={"password"}
                                    className={state.newPasswordRep ? "not-empty" : ""}
                                    size="sm"
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    isInvalid={state.errors.newPasswordRep}
                                />
                                <Form.Label>Powtórz hasło</Form.Label>
                                <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.newPasswordRep}</Form.Control.Feedback>
                            </Form.Group>
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

        const { type, operation = "create", state, data } = this.props;

        if (type === type1.typeSlug) userType = type1;
        else if (type === type2.typeSlug) userType = type2;

        // const isEdit = operation === "edit" && data.user;
        console.log(state);

        return (
            <div className={"d-flex flex-column align-items-center"}>
                <Form.Group className={"block mb-4 text-left animated-label"}>
                    <Form.Control
                        id={"login"}
                        type={"text"}
                        className={state.login ? "not-empty" : ""}
                        value={state.login}
                        size="sm"
                        autoComplete={"off"}
                        maxLength={"50"}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        isInvalid={state.errors.login}
                    />
                    <Form.Label>Login</Form.Label>
                    <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.login}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={"block mb-4 mt-2 text-left animated-label"}>
                    <Form.Control
                        id={"email"}
                        type={"email"}
                        className={state.email ? "not-empty" : ""}
                        value={state.email}
                        size="sm"
                        autoComplete={"off"}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        isInvalid={state.errors.email}
                    />
                    <Form.Label>Email</Form.Label>
                    <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.email}</Form.Control.Feedback>
                </Form.Group>

                {operation === "create" ?
                    <>
                        <Form.Group className={"block mb-4 mt-2 text-left animated-label"}>
                            <Form.Control
                                id={"password"}
                                type={"password"}
                                className={state.password ? "not-empty" : ""}
                                size="sm"
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={state.errors.password}
                            />
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"block mb-5 mt-2 text-left animated-label"}>
                            <Form.Control
                                id={"passwordRep"}
                                type={"password"}
                                className={state.passwordRep ? "not-empty" : ""}
                                size="sm"
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                isInvalid={state.errors.passwordRep}
                            />
                            <Form.Label>Powtórz hasło</Form.Label>
                            <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.passwordRep}</Form.Control.Feedback>
                        </Form.Group>
                    </>
                    : ""
                }

                {operation === "edit" ?
                    (state.isNewPasswordSet ?
                            <p className={"mb-4"}>
                                <i className={"dark-text"}>
                                    Hasło zostanie trwale zmienione po naciśnięciu przycisku "Zapisz" na dole formularza.
                                </i>
                            </p>
                        :
                            <>
                                <Button block variant="outline-white" size="sm" className={"mt-2 mb-5"} onClick={() => this.setState({modalShow: true})}>
                                    Zmień hasło
                                </Button>
                                {this.displayPasswordEdit()}
                            </>
                    )
                    : ""
                }

                <Form.Group className={"block mb-4 mt-2 text-left animated-label"}>
                    <Form.Control
                        id={"name"}
                        type={"text"}
                        className={state.name ? "not-empty" : ""}
                        value={state.name}
                        size="sm"
                        autoComplete={"off"}
                        maxLength={"100"}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        isInvalid={state.errors.name}
                    />
                    <Form.Label>{userType.nameFieldText}</Form.Label>
                    <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.name}</Form.Control.Feedback>
                </Form.Group>


                <Form.Group className={"block mb-4 mt-2 text-left animated-label"}>
                    <Dropdown
                        placeholder={"Województwo"}
                        value={state.voivodeship}
                        list={data.voivodeshipsOrdered}
                        slug={"voivodeship"}
                        toggleItem={this.toggleSelected}
                        animatedLabel
                        isInvalid={state.errors.voivodeship}
                    />
                    { state.errors.voivodeship ? <p className={"text-left error mt-1"}>{state.errors.voivodeship}</p> : ""}
                </Form.Group>
                <Form.Group className={"block mb-5 mt-2 text-left animated-label"}>
                    <Form.Control
                        id={"city"}
                        type={"text"}
                        className={state.city ? "not-empty" : ""}
                        value={state.city}
                        size="sm"
                        autoComplete={"off"}
                        maxLength={"50"}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        isInvalid={state.errors.city}
                    />
                    <Form.Label>Miasto</Form.Label>
                    <Form.Control.Feedback type="invalid" className={"text-left"}>{state.errors.city}</Form.Control.Feedback>
                </Form.Group>

                { this.blockInput("Gatunki", "genres", "genresOrdered") }
                { userType.typeSlug === "artist" ? this.blockInput("Instrumenty", "instruments", "instrumentsOrdered") : this.membersInput() }
                { this.statusInput() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isReauthenticate: state.auth.isReauthenticate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reauthenticate: (credentials) => dispatch(reauthenticate(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDataFormGroup);