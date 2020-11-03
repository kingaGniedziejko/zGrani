import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

class BlocksWithButton extends Component{
    render() {
        const { elementsList, isBgLight } = this.props;

        return (
            <div className={"blocks-container mb-1"}>
                {elementsList.map((elem, index) => {
                    return (
                        <div key={index} className={"d-flex flex-row mb-2 px-3 py-2" + (isBgLight ? " background-lighter" : " background-light")}>
                            <p className={"pt-1"}>{elem.name}</p>
                            { elem.path ?
                                <Link to={elem.path} className="ml-auto">
                                    <Button variant="outline-accent" size="sm">{elem.buttonText}</Button>
                                </Link>
                                : ""
                            }
                        </div>
                    )
                })}

            </div>
        );
    }
}

export default BlocksWithButton;