import React, { Component } from 'react';

class ErrorPage extends Component{
    render() {
        return (
            <div className={"d-flex flex-row align-items-center justify-content-center"} style={{height: "80vh"}}>
                <h2 className={"mt-5"}>404</h2>
            </div>
        );
    }
}

export default ErrorPage;