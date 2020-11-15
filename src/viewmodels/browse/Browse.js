import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "../../resources/styles/browse_style.css"

import BrowseContent from "./BrowseContent";

class Browse extends Component{
    state = {
        isArtist: true
    }

    typeChange = (isArtist) => {
        this.setState({isArtist: isArtist});
    }

    render() {
        const { isArtist } = this.state;

        if (this.props.auth.uid && !this.props.auth.emailVerified) return <Redirect to={"/potwierdzanie-adresu-email"}/>

        return (
            <div id={"browse"} className={"page-content"}>
                <div className={"section-light d-flex flex-column align-items-center pt-5 pb-4"}>
                    <h3>Przeglądaj</h3>
                    <div className={"nav mb-5"}>
                        <h6 className={"py-1 mx-2 clickable" + (isArtist ? " active" : "")} onClick={() => this.typeChange(true)}>Artyści</h6>
                        <h6 className={"py-1 mx-2 clickable" + (isArtist ? "" : " active")} onClick={() => this.typeChange(false)}>Zespoły</h6>
                    </div>
                    <BrowseContent isArtist={isArtist}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Browse);