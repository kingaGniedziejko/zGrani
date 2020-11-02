import React, { Component } from 'react';
import { Button } from "react-bootstrap";

import ImageBlock from "./ImageBlock";

class ImageBlocksDisplay extends Component{

    selectFiles = (e) => {
        const { type, slug, fileSlug, addHandler } = this.props;

        function read(file) {
            if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
                let reader = new FileReader();

                reader.addEventListener("load", function () {
                    addHandler(slug, fileSlug, this.result, file);
                }, false);

                reader.readAsDataURL(file);
            }
        }

        if (type === "single") {
            let file = e.target.files[0];
            if (file) read(file);

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
        let { type, elementsList, slug, fileSlug, srcSlug, deletedSlug, deleteHandler } = this.props;
        return (
            <div className={"blocks-container mb-5 d-flex flex-column align-items-center " + type}>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    {type === "single" ?
                        elementsList === undefined
                            ? this.buttonAdd(type)
                            : <ImageBlock imageUrl={elementsList} slug={slug} fileSlug={fileSlug} srcSlug={srcSlug} deletedSlug={deletedSlug} deleteHandler={deleteHandler}/>
                        :
                        elementsList === undefined ? ""
                            : elementsList.map((elem, index) => {
                                return (
                                    <ImageBlock key={index} index={index} imageUrl={elem} slug={slug} fileSlug={fileSlug} srcSlug={srcSlug} deletedSlug={deletedSlug} deleteHandler={deleteHandler}/>
                                )})
                    }
                </div>
                {type === "single" ? "" : this.buttonAdd(type) }
            </div>
        );
    }
}

export default ImageBlocksDisplay;