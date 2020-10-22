import React, { Component } from 'react';
import {ChevronDown, ChevronUp} from "react-bootstrap-icons";
import listensToClickOutside from 'react-onclickoutside';


class DropdownInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            listOpen: false
        }
    }

    handleClickOutside(){
        this.setState({
            listOpen: false
        })
    }

    toggleList(){
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    render(){
        const { placeholder, defaultValue, value = '', list, slug, toggleItem, isMultiple = false } = this.props
        const { listOpen } = this.state
        return(
            <div className="dd-wrapper" style={{width: "100%"}}>
                <div className="dd-header d-flex flex-row align-items-center justify-content-between" onClick={() => this.toggleList()}>
                    <div className={"dd-header-title" + (value || defaultValue ? "" : " placeholder")}>
                        { value ? value : (defaultValue ? defaultValue : placeholder) }
                    </div>
                    { listOpen ? <ChevronUp/> : <ChevronDown/> }
                </div>
                {listOpen && <ul className="dd-list list-unstyled text-left">
                    {list.map((item) => (
                        <li className={ "dd-list-item clickable" + (!isMultiple && value === item.name ? " selected" : "")}  key={item.id}
                            onClick={() => {
                                toggleItem(item.id, item.name, slug, isMultiple);
                                this.toggleList();
                            }}>
                            {item.name}
                        </li>
                    ))}
                </ul>}
            </div>
        )
    }
}

export default listensToClickOutside(DropdownInput)