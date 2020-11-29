import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import ReactAudioPlayer from "react-audio-player";

import {X} from "react-bootstrap-icons";

class BlocksRecords extends Component{

    selectFiles = (e) => {
        const { slug, fileSlug, addHandler } = this.props;

        function read(file) {
            // if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
                let reader = new FileReader();

                reader.addEventListener("load", function () {
                    addHandler(slug, fileSlug, this.result, file);
                }, false);

                reader.readAsDataURL(file);
            // }
        }

        let files = e.target.files;
        if (files) [].forEach.call(files, read);
    }


    buttonAdd = (id) => {
        return (
            <div className={"custom-file-input-button position-relative mt-2"}>
                <input
                    id={id}
                    type="file"
                    className="custom-file-input position-absolute"
                    style={{top: 0, right: 0, height: "31px", width: "unset"}}
                    multiple={true}
                    onChange={this.selectFiles}/>
                <Button variant="outline-accent" size="sm" className={"px-4"}>Dodaj</Button>
            </div>
        );
    }


    render() {
        let { elementsList, slug, fileSlug, srcSlug, deletedSlug, deleteHandler  } = this.props;

        return (
            <div className={"block blocks-container mb-5 d-flex flex-column align-items-center"}>
                <div className={"block d-flex flex-column"}>
                    { elementsList === undefined ? ""
                        : elementsList.map((elem, index) => {
                            return (
                                <div key={index} className={"block position-relative mb-2"}>
                                    <ReactAudioPlayer src={elem} title={"Sample " + (index + 1)} controls/>
                                    <X
                                        size={20}
                                        className={"position-absolute clickable background-dark"}
                                        onClick={()=>deleteHandler(slug, fileSlug, srcSlug, deletedSlug, index)}
                                        style={{top: "-10px", right: "-25px"}}
                                    />
                                </div>
                            )})
                    }
                </div>
                {this.buttonAdd()}
            </div>
        );
    }
}

export default BlocksRecords;