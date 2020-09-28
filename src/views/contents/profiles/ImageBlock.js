import React, { Component } from 'react';

import {X} from 'react-bootstrap-icons';
import {Image} from "react-bootstrap";

class ImageBlock extends Component{
    render() {
        let { image, deleteHandler } = this.props;

        return (
            <div className={"image-block position-relative"}>
                <Image src={image}/>
                <X size={20} className={"position-absolute clickable background-dark"} onClick={()=>deleteHandler(image)}/>
            </div>
        )
    }
}

export default ImageBlock;