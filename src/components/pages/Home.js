import React, { Component } from 'react';
import  {Container, Row, Col, Button, Nav, Image} from "react-bootstrap";

import photo1 from '../../images/lacey-williams-0c9CmxU0EJI-unsplash.jpg';
import photo2 from '../../images/glenn-van-de-wiel-DWHSc8o8K9Y-unsplash.jpg';
import photo3 from '../../images/oscar-keys-ojVMh1QTVGY-unsplash.jpg';

class Home extends Component{
    render() {
        return (
            <div className={"home"}>
                <div className={"section photo-section d-flex justify-content-center align-items-center"}>
                    <div className={"section-content"}>
                        <h1 className="text-center">zGrani - portal dla muzyków</h1>
                        <h3 className="text-center">i nie tylko</h3>
                        <p className="text-center">Stwórz profil, załóż zespół, znajdź zastępstwo, zatrudnij twórcę</p>
                    </div>
                </div>
                <div className={"section section-dark-gradient"}>
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
                                <Button variant="outline-accent mt-auto" size="sm">Rozpocznij</Button>
                            </Col>
                            <Col className="col-12 col-sm-8 col-lg-4 mt-5 mt-lg-0 d-flex flex-column align-items-center">
                                <Image src={photo2} fluid className="my-5"/>
                                <h5 className="text-center mb-3">Stwórz konto swojego zespołu</h5>
                                <p className="text-center dark-text mb-4">
                                    Stwórz portfolio zespołu, szukaj nowych członków,
                                    znajdź szybko zastępstwo w okolicy.
                                    Zostań zauważony przez pracodawców.
                                </p>
                                <Button variant="outline-accent mt-auto" size="sm">Rozpocznij</Button>
                            </Col>
                            <Col className="col-12 col-sm-8 col-lg-4 mt-5 mt-lg-0 d-flex flex-column align-items-center">
                                <Image src={photo3} fluid className="my-5"/>
                                <h5 className="text-center mb-3">Znajdź artystę</h5>
                                <p className="text-center dark-text mb-4">
                                    Organizujesz wydarzenie?
                                    Szukasz artysty lub zespołu?
                                </p>
                                <Button variant="outline-accent mt-auto" size="sm">Szukaj</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Home;
