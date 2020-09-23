import React, { Component } from 'react';

import {X} from 'react-bootstrap-icons';

class Blocks extends Component{
    render() {
        let { elementsList, align, editable, slug, handler } = this.props;

        editable = editable !== undefined

        return (
            <div className={"blocks-container mb-1 d-flex flex-row flex-wrap justify-content-"+align}>
                {elementsList.map((elem, index) => {
                    return (
                        <div key={index} className={"block d-flex flex-row align-items-center background-lighter mr-2 mb-2 py-1" + (editable ? " pl-3 pr-2" : " px-3")}>
                            {elem}
                            {editable ? <X className={"ml-2"} onClick={()=>handler(slug, elem)}/> : ""}
                        </div>
                    )
                })}

            </div>
        );
    }
}

export default Blocks;