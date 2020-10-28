import React, { Component } from 'react';

import {X} from 'react-bootstrap-icons';
import Dropdown from "./DropdownInput";

class BlocksStatusElement extends Component{
    state = {

    }

    toggleSelected = (id, item, itemSlug, isMultiple) => {
        const { instrumentHandler, index, slug } = this.props;

        if (!isMultiple) {
            instrumentHandler(slug, index, item);

            this.setState({
                [itemSlug]: item
            })
        }
    }

    render() {
        const { elem, slug, instrumentList, deleteHandler, index } = this.props;

        return (
            <>
                <div className={"block d-flex flex-column background-lighter mb-2 py-2 pl-3 pr-2"}>
                    <div className={"block d-flex flex-row align-items-center"}>
                        <p className={"text-left"}>{elem.name}</p>
                        <X className={"clickable ml-auto"} size={25} onClick={()=>deleteHandler(slug, elem)}/>
                    </div>
                    {
                        elem.withInstrument ?
                            <div className={"mr-4 mt-1"}>
                                <Dropdown placeholder={"Instrument"}
                                          value={elem.instrument}
                                          list={instrumentList}
                                          slug={"instrument-" + index}
                                          toggleItem={this.toggleSelected} />
                            </div>
                            : ""
                    }
                </div>
            </>
        );
    }
}


export default BlocksStatusElement;