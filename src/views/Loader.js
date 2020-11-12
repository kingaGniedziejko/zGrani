import React, { Component } from 'react';
import LoaderSvg from "../resources/images/loader.svg";

class Loader extends Component{
    render() {
        const { fullscreen = true } = this.props;
        return (
            <div className={"d-flex flex-row align-items-center justify-content-center" + (fullscreen ? " fullscreen" : "")}>
                <object type="image/svg+xml" data={LoaderSvg}>svg-animation</object>
            </div>
        );
    }
}

export default Loader;