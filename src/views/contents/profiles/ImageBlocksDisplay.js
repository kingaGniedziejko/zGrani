import React, { Component } from 'react';

import {X} from 'react-bootstrap-icons';
import { Button, Image } from "react-bootstrap";
import ImageBlock from "./ImageBlock";

class ImageBlocksDisplay extends Component{
    render() {
        let { type, elementsList, slug, deleteHandler } = this.props;

        return (
            <div className={"blocks-container mb-5 d-flex flex-column align-items-center " + type}>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    {type === "single" ?
                        elementsList === undefined ?
                            <Button variant="outline-accent" size="sm" className={"mt-2"}>Dodaj</Button>
                            :
                            <ImageBlock image={elementsList} slug={slug} deleteHandler={deleteHandler}/>
                        :
                        elementsList.map((elem, index) => {
                            return (
                                <ImageBlock key={index} image={elem} slug={slug} deleteHandler={deleteHandler}/>
                            )
                        })
                    }
                </div>
                {type === "single" ? "" : <Button variant="outline-accent" size="sm" className={(elementsList.length === 0 ? "mt-2" : "mt-3")}>Dodaj</Button>}
            </div>
        );
    }
}

export default ImageBlocksDisplay;