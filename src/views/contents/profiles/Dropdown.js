import React, { Component } from 'react';
import {ChevronDown, ChevronUp} from "react-bootstrap-icons";
import listensToClickOutside from 'react-onclickoutside';


class Dropdown extends Component {
    constructor(props){
        super(props)
        this.state = {
            listOpen: false,
            headerTitle: this.props.title
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
        const { list, toggleItem } = this.props
        const { listOpen, headerTitle } = this.state
        return(
            <div className="dd-wrapper mb-3">
                <div className="dd-header d-flex flex-row align-items-center justify-content-between" onClick={() => this.toggleList()}>
                    <div className="dd-header-title">{headerTitle}</div>
                    { listOpen ? <ChevronUp/> : <ChevronDown/> }
                </div>
                {listOpen && <ul className="dd-list list-unstyled text-left">
                    {list.map((item) => (
                        <li className="dd-list-item clickable" key={item.id}
                            onClick={() => {
                                toggleItem(item.id, item.title, item.key);
                                this.toggleList();
                            }}>
                            {item.title}
                        </li>
                    ))}
                </ul>}
            </div>
        )
    }

}

export default listensToClickOutside(Dropdown)