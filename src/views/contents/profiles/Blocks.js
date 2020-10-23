import React, { Component } from 'react';

import {X} from 'react-bootstrap-icons';

class Blocks extends Component{
    render() {
        let { elementsList, align, editable, slug, handler, flex_1 = false } = this.props;

        editable = editable !== undefined

        return (
            <div className={"blocks-container mb-1 d-flex flex-row flex-wrap justify-content-"+align}>
                {elementsList.map((elem, index) => {
                    return (
                        <div key={index} className={"d-flex flex-row align-items-center background-lighter mr-2 mb-2 py-1 pl-2 pr-2"} style={flex_1 ? {flex: 1} : {}}                            >
                            <p className={(editable ? "ml-1 mr-3" : "ml-2 mr-2")}>{elem.name.replace(/ /g, "\u00a0")}</p>
                            {editable ? <X className={"ml-auto"} onClick={()=>handler(slug, elem)}/> : ""}
                        </div>
                    )
                })}

            </div>
        );
    }
}

export default Blocks;