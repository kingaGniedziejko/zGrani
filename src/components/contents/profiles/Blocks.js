import React, { Component } from 'react';

class Blocks extends Component{
    render() {
        const { elementsList } = this.props;

        return (
            <div className={"blocks-container mb-1"}>
                {elementsList.map((elem, index) => {
                    return (
                        <div className={"block d-inline-block background-lighter mr-2 mb-2 px-3 py-1"}>
                            {elem}
                        </div>
                    )
                })}

            </div>
        );
    }
}

export default Blocks;