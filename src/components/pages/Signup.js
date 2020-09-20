import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Signup extends Component{
    render() {
        return (
            <div id={"signup"} className={"page-content"}>
                <div className={"d-flex flex-column align-items-center py-5"}>
                    <h3>Rejestracja</h3>
                    <Link to={"/rejestracja/artysta"}>
                        <div>Artysta</div>
                    </Link>
                    <Link to={"/rejestracja/zespol"}>
                        <div>Zespół</div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Signup;