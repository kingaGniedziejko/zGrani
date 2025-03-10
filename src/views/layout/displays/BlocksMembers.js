import React, { Component } from 'react';

import BlocksMembersElement from "./BlocksMembersElement";

class BlocksMembers extends Component{

    render() {
        let { elementsList, align, editable, slug, handler, linkingHandler } = this.props;
        editable = editable !== undefined

        return (
            <div className={"blocks-container mb-1 d-flex flex-column justify-content-"+align}>
                {elementsList.map((elem, index) => {
                    return (
                        <BlocksMembersElement key={index} index={index} elem={elem} editable={editable}
                                              slug={slug} handler={handler} linkingHandler={linkingHandler}/>
                    )
                })}

            </div>
        );
    }
}

export default BlocksMembers;