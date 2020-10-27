import React, { Component } from 'react';

import "../../../resources/styles/browse_style.css"

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
        return (
            <div id={"browse"} className={"page-content"}>
                <div className={"section-light d-flex flex-column align-items-center pt-5 pb-4"}>
                    <h3>Przeglądaj</h3>
                    <div className={"nav mb-5"}>
                        <a className={"py-1 mx-2 clickable" + (isArtist ? " active" : "")} onClick={() => this.typeChange(true)}>Artyści</a>
                        <a className={"py-1 mx-2 clickable" + (isArtist ? "" : " active")} onClick={() => this.typeChange(false)}>Zespoły</a>
                    </div>
                    <BrowseContent isArtist={isArtist}/>
                </div>
            </div>
        );
    }
}

export default Browse;