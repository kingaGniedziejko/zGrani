import React, { Component } from 'react';
import {Link} from "react-router-dom";

import "../../resources/styles/footer_style.css"

class Footer extends Component{
    render() {
        return (
            <div id={"footer"} className="d-flex flex-column flex-md-row p-3 flex-wrap flex-md-nowrap">
                <div className="d-flex flex-column flex-md-row flex-wrap mb-3 mb-md-0">
                    <Link to={"/"} className="mx-2 my-1 my-md-1 align-self-md-center">Strona&nbsp;główna</Link>
                    <span className="icon-text">.</span>
                    <Link to={"/"} className="mx-2 my-1 my-md-1 align-self-md-center">Regulamin</Link>
                    <span className="icon-text">.</span>
                    <Link to={"/"} className="mx-2 my-1 my-md-1 align-self-md-center">Polityka&nbsp;prywatności</Link>
                </div>
                <div id={"copyright"} className="ml-auto p-2 accent-text">
                    Copyright © 2020 zGrani
                </div>
            </div>
        );
    }
}

export default Footer;