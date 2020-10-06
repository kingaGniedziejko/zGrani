import React, { Component } from 'react';
import { Button } from "react-bootstrap";

import ImageBlock from "./ImageBlock";

class ImageBlocksDisplay extends Component{

    selectFiles = (e) => {
        console.log(e.target.files);
    }

    buttonAdd = (type, id) => {
        let opts = {};
        if (type === "multiple") opts["multiple"] = "multiple";

        return (
            <div className={"custom-file-input-button position-relative mt-2"}>
                <input id={id} type="file" className="custom-file-input position-absolute"
                       style={{top: 0, right: 0, height: "31px"}}
                       {...(type === "multiple" ? {multiple:true} : {})}
                       onChange={this.selectFiles}/>
                <Button variant="outline-accent" size="sm">Dodaj</Button>
            </div>
        );
    }


    render() {
        let { type, elementsList, slug, deleteHandler } = this.props;

        return (
            <div className={"blocks-container mb-5 d-flex flex-column align-items-center " + type}>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    {type === "single" ?
                        elementsList === undefined ? this.buttonAdd(type) : <ImageBlock image={elementsList} slug={slug} deleteHandler={deleteHandler}/>
                        :
                        elementsList.map((elem, index) => {
                            return (
                                <ImageBlock key={index} image={elem} slug={slug} deleteHandler={deleteHandler}/>
                            )
                        })
                    }
                </div>
                {type === "single" ? "" : this.buttonAdd(type) }
            </div>
        );
    }
}

export default ImageBlocksDisplay;