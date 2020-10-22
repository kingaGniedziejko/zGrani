import React, { Component } from "react";
import {Col, Container, Row} from "react-bootstrap";
import ProfileShortcut from "../profiles/ProfileShortcut";
import {ChevronDown} from "react-bootstrap-icons";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class BrowseDisplay extends Component{
    render() {
        let { users, instrument, genre } = this.props;

        if (instrument && genre) {
            users = users.filter(user => user.genresId.includes(genre.id));
        }

        return (
            <div className={"section d-flex flex-column align-items-center"}>
                <Container>
                    <Row>
                        {users && users.map((user, index) => {
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
                <div className={"d-flex flex-column align-items-center clickable"}>
                    <p className={"m-0"}>Więcej</p>
                    <ChevronDown/>
                </div>
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
                        ["instrumentsId", "array-contains", props.instrument.id]
                    ]
                }
            ]
        else if (props.instrument && !props.genre)
            return [
                {collection: "users",
                    where: [
                        ["instrumentsId", "array-contains", props.instrument.id]
                    ]
                }
            ]
        else if (!props.instrument && props.genre)
            return [
                {collection: "users",
                    where: [
                        ["genresId", "array-contains", props.genre.id]
                    ]
                }
            ]
        else
            return [{collection: "users"}]
    })
)(BrowseDisplay);
