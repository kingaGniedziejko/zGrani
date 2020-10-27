import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileShortcut from "../profiles/ProfileShortcut";
import { ChevronDown } from "react-bootstrap-icons";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Loader from "../../layouts/Loader";

class SearchDisplay extends Component{
    state = {
        limit: 16
    }

    handleExtend = () => {
        const limitBy = 16;
        this.setState({
            limit: this.state.limit + limitBy
        })
    }

    render() {
        let { users } = this.props;
        const { limit } = this.state;

        if (!users) return <Loader/>

        let usersList = [];
        let isMore = users.length > limit;

        if (isMore) {
            usersList = users.slice(0, limit);
        } else {
            usersList = users;
        }

        return (
            <div className={"section d-flex flex-column align-items-center block background-dark block pb-4 pt-5"}>
                <Container>
                    <Row>
                        {usersList && usersList.map((user, index) => {
                            if (user) {
                                return (
                                    <Col key={index} sm={6} lg={3}><ProfileShortcut user={user}/></Col>
                                )
                            } else {
                                return "";
                            }
                        })}
                    </Row>
                </Container>
                {isMore ?
                    <div className={"d-flex flex-column align-items-center clickable"} onClick={this.handleExtend}>
                        <p className={"m-0"}>Więcej</p>
                        <ChevronDown/>
                    </div>
                    : ""
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.filteredUsers
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect ( (props) => [
        {collection: "users",
            where: ["isArtist", "==", props.isArtist],
            storeAs: "filteredUsers"
        }]
    )
)(SearchDisplay);
