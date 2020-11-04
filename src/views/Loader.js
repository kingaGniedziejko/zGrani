import React, { Component } from 'react';
import LoaderSvg from "../resources/images/loader.svg";

class Loader extends Component{
    render() {
        return (
            <div className={"fullscreen d-flex flex-row align-items-center justify-content-center"}>
                <object type="image/svg+xml" data={LoaderSvg}>svg-animation</object>
            </div>
        );
    }
}

export default Loader;