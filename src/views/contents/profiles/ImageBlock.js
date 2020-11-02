import React, { Component } from 'react';

import {X} from 'react-bootstrap-icons';
import {Image} from "react-bootstrap";

class ImageBlock extends Component{
    render() {
        let { imageUrl, slug, index, fileSlug, srcSlug, deletedSlug, deleteHandler } = this.props;

        return (
            <div className={"image-block position-relative"}>
                <Image src={imageUrl} className={"shadow"}/>
                <X size={20} className={"position-absolute clickable background-dark"} onClick={()=>deleteHandler(slug, fileSlug, srcSlug, deletedSlug, index)}/>
            </div>
        )
    }
}

export default ImageBlock;