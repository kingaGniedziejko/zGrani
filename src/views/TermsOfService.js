import React, { Component } from 'react';
import  {Container, Row, Col } from "react-bootstrap";

class TermsOfService extends Component{
    render() {
        return (
            <div id={"terms-of-service"} className={"page-content"}>
                <Container>
                    <Row className={"justify-content-center"}>
                        <Col xs={12} md={11} lg={10} className={"text-center m-2"}>
                            <h3 className={"mt-5 mb-5"}>Regulamin</h3>

                            <h5 className={"mb-1 accent-text"}>§ 1</h5>
                            <h6 className={"mb-3 accent-text"}>Postanowienia wstępne</h6>
                            <p className={"mb-5"}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pharetra lacinia est eu
                                gravida. Mauris condimentum metus tellus, nec dapibus diam tempus quis. Integer ut faucibus velit.
                                Maecenas feugiat accumsan dignissim. Pellentesque quis diam id enim tempus placerat eu vel odio.
                                Suspendisse bibendum purus at orci accumsan, ut egestas enim consectetur. Aliquam hendrerit
                                pellentesque lorem, et rutrum ligula fermentum vel. Nunc in semper augue. Duis arcu lorem, bibendum
                                sit amet accumsan ac, maximus a ligula. Duis vestibulum tincidunt felis auctor interdum. Praesent
                                pharetra eleifend rutrum. Mauris auctor eu lorem nec fringilla. Sed mauris sapien, fermentum in
                                orci sed, congue eleifend tortor.
                            </p>

                            <h5 className={"mb-1 accent-text"}>§ 2</h5>
                            <h6 className={"mb-3 accent-text"}>Definicje</h6>
                            <p className={"mb-5"}>
                                Nunc iaculis convallis felis, at fringilla massa facilisis rhoncus. Cras cursus, libero a facilisis
                                egestas, erat elit venenatis ipsum, vitae interdum sapien quam eu nisi. Nam dictum mi id est
                                volutpat, malesuada convallis tortor laoreet. Cras elit ante, faucibus consequat mi eu, ornare
                                porta odio. Aliquam erat volutpat. Sed lacinia pretium varius. Sed dignissim iaculis erat. Fusce
                                velit massa, placerat nec enim id, auctor euismod nulla.
                            </p>

                            <h5 className={"mb-1 accent-text"}>§ 3</h5>
                            <h6 className={"mb-3 accent-text"}>Wymagania techniczne</h6>
                            <p className={"mb-5"}>
                                Fusce in bibendum sapien, quis auctor orci. Sed pellentesque libero id sem lobortis porttitor.
                                Vivamus convallis vitae nulla vitae venenatis. Morbi sit amet tortor id orci sodales vehicula nec
                                eu quam. Cras tincidunt purus ac luctus laoreet. Duis lacus massa, tempus non pharetra et, sagittis
                                at lorem. Phasellus nunc lacus, pretium eu eleifend tempor, laoreet vitae dolor. Donec quis erat
                                neque. Aliquam rutrum nibh tincidunt, molestie est a, scelerisque metus. Donec vestibulum tellus
                                risus, hendrerit scelerisque turpis ultricies eget. Cras pellentesque, metus ut eleifend feugiat,
                                urna libero pulvinar neque, vel mollis ipsum felis vitae risus.
                            </p>

                            <h5 className={"mb-1 accent-text"}>§ 4</h5>
                            <h6 className={"mb-3 accent-text"}>Zakładanie Konta</h6>
                            <p className={"mb-5"}>
                                In diam eros, molestie in bibendum vel, venenatis sit amet ex. Vivamus facilisis imperdiet porta.
                                Nam faucibus, tortor vitae accumsan rutrum, mauris ligula sollicitudin nisl, pellentesque dapibus
                                dui neque a enim. Nulla ac mi eu mauris lacinia vehicula. Maecenas porta nec nunc sit amet
                                tincidunt. Curabitur id quam ipsum. Integer euismod ornare posuere. Donec tincidunt blandit est,
                                vel pulvinar sapien cursus nec.
                            </p>

                            <h5 className={"mb-1 accent-text"}>§ 5</h5>
                            <h6 className={"mb-3 accent-text"}>Dane osobowe użytkownika</h6>
                            <p className={"mb-5"}>
                                uspendisse potenti. Sed consectetur ligula nec felis hendrerit porta. Maecenas accumsan sit amet
                                est id euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin eget nunc at
                                risus elementum hendrerit. Integer sagittis sapien quis feugiat placerat. Aenean ut suscipit risus.
                                Sed egestas justo id erat ornare, sed convallis leo fringilla. Sed consequat dapibus purus, eu
                                imperdiet nisl varius ac.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default TermsOfService;
