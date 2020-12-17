import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

import photo1 from '../../../resources/images/lacey-williams-0c9cmxu0eji-unsplash.jpg';
import photo2 from '../../../resources/images/glenn-van-de-wiel-dwhsc8o8k9y-unsplash.jpg';
import photo3 from '../../../resources/images/oscar-keys-ojvmh1qtvgy-unsplash.jpg';

function HomePage(props){
    if (props.auth.uid && !props.auth.emailVerified) return <Redirect to={"/potwierdzanie-adresu-email"}/>

    return (
        <div className={"home"}>
            <div className={"section photo-section d-flex flex-column align-items-center"}>
                <div id={"title-text"} className={"section-content mt-1 mt-sm-4 mt-lg-5 px-3"}>
                    <h1 className="text-center mb-1">zGrani</h1>
                    <h2 className="text-center mb-3" style={{fontSize: "1.5rem"}}>portal dla muzyków i nie tylko</h2>
                    <p className="text-center">Stwórz profil, załóż zespół, znajdź zastępstwo, zatrudnij twórcę</p>
                </div>
            </div>
            <div className={"section section-dark-gradient py-5"}>
                <Container className={"section-content"}>
                    <Row className="py-5 justify-content-center">
                        <Col className="col-12 col-sm-8 col-lg-4 mt-5 mt-lg-0 d-flex flex-column align-items-center">
                            <Image src={photo1} fluid className="my-5" alt={"Artysta"}/>
                            <h5 className="text-center mb-3">Stwórz swoje osobiste konto</h5>
                            <p className="text-center dark-text mb-4">
                                Stwórz profil, wyraź siebie, pokaż nam na czym grasz,
                                znajdź artystów w okolicy, z którymi możesz stworzyć razem coś wielkiego.
                                Zostań zauważony przez pracodawców.
                            </p>
                            <Link to={"/rejestracja/artysta"} className="mt-auto">
                                <Button variant="outline-accent" size="sm">Rozpocznij</Button>
                            </Link>
                        </Col>
                        <Col className="col-12 col-sm-8 col-lg-4 mt-5 mt-lg-0 d-flex flex-column align-items-center">
                            <Image src={photo2} fluid className="my-5" alt={"Zespół"}/>
                            <h5 className="text-center mb-3">Stwórzcie konto zespołu</h5>
                            <p className="text-center dark-text mb-4">
                                Pokażcie swoje portfolio, szukajcie nowych członków,
                                znajdźcie szybko zastępstwo w okolicy.
                                Zostańcie zauważeni przez pracodawców.
                            </p>
                            <Link to={"/rejestracja/zespol"} className="mt-auto">
                                <Button variant="outline-accent" size="sm">Rozpocznij</Button>
                            </Link>
                        </Col>
                        <Col className="col-12 col-sm-8 col-lg-4 mt-5 mt-lg-0 d-flex flex-column align-items-center">
                            <Image src={photo3} fluid className="my-5" alt={"Szukaj twórcy"}/>
                            <h5 className="text-center mb-3">Znajdź artystę</h5>
                            <p className="text-center dark-text mb-4">
                                Organizujesz wydarzenie?
                                Szukasz artysty lub zespołu?
                                Skorzystaj z naszej wyszukiwarki twórców.
                            </p>
                            <Link to={"/szukaj"} className="mt-auto">
                                <Button variant="outline-accent" size="sm">Szukaj</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(HomePage);

