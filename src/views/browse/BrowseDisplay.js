import React, { Component } from "react";
import {Col, Container, Row} from "react-bootstrap";
import ProfileShortcut from "../users/UserShortcut";
import {ChevronDown} from "react-bootstrap-icons";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Loader from "../layout/Loader";

class BrowseDisplay extends Component{
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
        let { users, instrument, genre } = this.props;
        const { limit } = this.state;

        if (!users) return <Loader/>

        if (instrument && genre) {
            users = users.filter(user => user.genresId.includes(genre.id));
        }

        let usersList = [];
        let isMore = users.length > limit;

        if (isMore) {
            usersList = users.slice(0, limit);
        } else {
            usersList = users;
        }

        return (
            <div className={"section d-flex flex-column align-items-center"}>
                {usersList && usersList.length === 0 ?
                    <p className={"mt-3 mb-5"}>
                        <i className={"dark-text"}>
                            Brak użytkowników
                        </i>
                    </p>
                    :
                    <>
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
                    </>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect ( (props) => {
        if (props.instrument && props.genre)
            return [
                {collection: "users",
                    where: [
                        ["instrumentsId", "array-contains", props.instrument.id],
                        ["isArtist", "==", props.isArtist]
                    ]
                }
            ]
        else if (props.instrument && !props.genre)
            return [
                {collection: "users",
                    where: [
                        ["instrumentsId", "array-contains", props.instrument.id],
                        ["isArtist", "==", props.isArtist]
                    ]
                }
            ]
        else if (!props.instrument && props.genre)
            return [
                {collection: "users",
                    where: [
                        ["genresId", "array-contains", props.genre.id],
                        ["isArtist", "==", props.isArtist]
                    ]
                }
            ]
        else
            return [
                {collection: "users",
                    where: ["isArtist", "==", props.isArtist]
                }
            ]
    })
)(BrowseDisplay);
