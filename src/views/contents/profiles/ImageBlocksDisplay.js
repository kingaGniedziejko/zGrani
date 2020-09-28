import React, { Component } from 'react';

import {X} from 'react-bootstrap-icons';
import {Image} from "react-bootstrap";
import ImageBlock from "./ImageBlock";

class ImageBlocksDisplay extends Component{
    render() {
        let { elementsList, deleteHandler } = this.props;

        return (
            <div className={"blocks-container mb-1 d-flex flex-row flex-wrap"}>
                {elementsList.map((elem, index) => {
                    return (
                        <ImageBlock key={index} image={elem} deleteHandler={deleteHandler}/>
                    )
                })}

            </div>
        );
    }
}

export default ImageBlocksDisplay;