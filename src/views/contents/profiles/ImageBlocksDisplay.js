import React, { Component } from 'react';
import { Button } from "react-bootstrap";

import ImageBlock from "./ImageBlock";

class ImageBlocksDisplay extends Component{

    selectFiles = (e) => {
        const { type, slug, addHandler } = this.props;

        function read(file) {
            if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
                let reader = new FileReader();

                reader.addEventListener("load", function () {
                    addHandler(slug, this.result);
                }, false);

                reader.readAsDataURL(file);
            }
        }

        if (type === "single") {
            let file = e.target.files[0];
            if (file) read(file);

            // let reader = new FileReader();
            //
            // reader.onloadend = () => {
            //     this.props.addHandler(this.props.slug, reader.result);
            // }
            //
            // let file = e.target.files[0];
            // reader.readAsDataURL(file);
        } else {
            let files = e.target.files;
            if (files) [].forEach.call(files, read);
        }
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
                        elementsList === undefined ? ""
                            : elementsList.map((elem, index) => {
                                return (
                                    <ImageBlock key={index} image={elem} slug={slug} deleteHandler={deleteHandler}/>
                                )})
                    }
                </div>
                {type === "single" ? "" : this.buttonAdd(type) }
            </div>
        );
    }
}

export default ImageBlocksDisplay;