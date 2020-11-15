import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import SearchContent from "./SearchContent";

class Search extends Component{
    state = {
        isArtist: true
    }

    typeChange = (isArtist) => {
        this.setState({isArtist: isArtist})
    }

    render() {
        const { isArtist } = this.state;

        if (this.props.auth.uid && !this.props.auth.emailVerified) return <Redirect to={"/potwierdzanie-adresu-email"}/>

        return (
            <div id={"search"} className={"page-content"}>
                <div className={"d-flex flex-column align-items-center pt-5"}>
                    <h3>Szukaj</h3>
                        <div className={"nav mb-5"}>
                        <h6 className={"py-1 mx-2 clickable" + (isArtist ? " active" : "")} onClick={() => this.typeChange(true)}>Artyści</h6>
                        <h6 className={"py-1 mx-2 clickable" + (isArtist ? "" : " active")} onClick={() => this.typeChange(false)}>Zespoły</h6>
                    </div>
                    <SearchContent isArtist={isArtist}/>
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

export default connect(mapStateToProps)(Search);