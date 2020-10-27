import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileShortcut from "../profiles/ProfileShortcut";
import { ChevronDown } from "react-bootstrap-icons";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect   } from "react-redux-firebase";
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

    handleGetState = () => {

    }

    // getStatus = (userId) => {
    //     useFirebaseConnect([{
    //         collection: "users",
    //         doc: userId,
    //         subcollections: [{ collections: "status" }],
    //         storeAs: "status-" + userId
    //     }]);
    //     return useSelector(state => state.firestore.ordered["status-" + userId]);
    // }

    render() {
        let { users, searchParams } = this.props;
        const { limit } = this.state;

        if (!users) return <Loader/>

        console.log(searchParams);

        searchParams.forEach(elem => {
            switch (elem.param) {
                case "genreId":
                    users = users.filter(user => user.genresId.includes(elem.value));
                    break;
                case "instrumentId":
                    users = users.filter(user => user.instrumentsId.includes(elem.value));
                    break;
                case "status":
                    users = users.filter(user => (
                        user.status.some(stat => elem.statusInstrumentId
                            ? stat.statusId === elem.value && stat.instrumentId === elem.statusInstrumentId
                            : stat.statusId === elem.value
                        )
                    ));
                    break;
                default:
            }
        })

        console.log(users);

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
                                    <Col key={index} sm={6} lg={3}>
                                        <ProfileShortcut user={user}/>
                                    </Col>
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
    firestoreConnect ( (props) => {
        return [
            {collection: "users",
                where: props.searchParams.map(elem => (
                    elem.param === "isArtist" || elem.param === "voivodeshipId" || elem.param === "city"
                        ? [elem.param, "==", elem.value]
                        : null )).filter(Boolean),
                storeAs: "filteredUsers"
            }]
        }
    )
)(SearchDisplay);

