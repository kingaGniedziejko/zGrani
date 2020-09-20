import React, { Component } from 'react';
import  {Container, Row, Col, Button, Nav, Image} from "react-bootstrap";

import photo1 from '../../images/lacey-williams-0c9CmxU0EJI-unsplash.jpg';
import photo2 from '../../images/glenn-van-de-wiel-DWHSc8o8K9Y-unsplash.jpg';
import photo3 from '../../images/oscar-keys-ojVMh1QTVGY-unsplash.jpg';
import {Link} from "react-router-dom";

class Home extends Component{
    render() {
        return (
            <div className={"home"}>
                <div className={"section photo-section d-flex flex-column align-items-center"}>
                    <div id={"title-text"} className={"section-content mt-1 mt-sm-4 mt-lg-5 px-3"}>
                        <h1 className="text-center mb-1">zGrani</h1>
                        <h4 className="text-center mb-3">portal dla muzyków i nie tylko</h4>
                        <p className="text-center">Stwórz profil, załóż zespół, znajdź zastępstwo, zatrudnij twórcę</p>
                    </div>
                </div>
                <div className={"section section-dark-gradient py-5"}>
                    <Container className={"section-content"}>
                        <Row className="py-5 justify-content-center">
                            <Col className="col-12 col-sm-8 col-lg-4 mt-5 mt-lg-0 d-flex flex-column align-items-center">
                                <Image src={photo1} fluid className="my-5"/>
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
                                <Image src={photo2} fluid className="my-5"/>
                                <h5 className="text-center mb-3">Stwórz konto swojego zespołu</h5>
                                <p className="text-center dark-text mb-4">
                                    Stwórz portfolio zespołu, szukaj nowych członków,
                                    znajdź szybko zastępstwo w okolicy.
                                    Zostań zauważony przez pracodawców.
                                </p>
                                <Link to={"/rejestracja/zespol"} className="mt-auto">
                                    <Button variant="outline-accent" size="sm">Rozpocznij</Button>
                                </Link>
                            </Col>
                            <Col className="col-12 col-sm-8 col-lg-4 mt-5 mt-lg-0 d-flex flex-column align-items-center">
                                <Image src={photo3} fluid className="my-5"/>
                                <h5 className="text-center mb-3">Znajdź artystę</h5>
                                <p className="text-center dark-text mb-4">
                                    Organizujesz wydarzenie?
                                    Szukasz artysty lub zespołu?
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
}

export default Home;
