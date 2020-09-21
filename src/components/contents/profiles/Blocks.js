import React, { Component } from 'react';

class Blocks extends Component{
    render() {
        const { elementsList } = this.props;

        return (
            <div className={"blocks-container mb-1"}>
                {elementsList.map((elem, index) => {
                    return (
                        <div className={"block mr-1 mb-1 border d-inline-block px-2"}>
                            {elem}
                        </div>
                    )
                })}

            </div>
        );
    }
}

export default Blocks;