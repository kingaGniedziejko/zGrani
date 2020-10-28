import React, { Component } from 'react';
import BlocksStatusElement from "./BlocksStatusElement";


class BlocksStatus extends Component{
    render() {
        let { elementsList, instrumentList, slug, deleteHandler, instrumentHandler } = this.props;

        return (
            <div className={"blocks-container mb-1 d-flex flex-column"}>
                {elementsList.map((elem, index) => {
                    return (
                        <BlocksStatusElement key={index} index={index} elem={elem} slug={slug} instrumentList={instrumentList}
                                             deleteHandler={deleteHandler} instrumentHandler={instrumentHandler}/>
                    )
                })}
            </div>
        );
    }
}

export default BlocksStatus;