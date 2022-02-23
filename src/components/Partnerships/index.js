import { Collapse } from "bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import './style.css';

export default function Partnerships() {
    return (
        <div className="partnerships">
            <Container>
                <h2>PARCERIAS</h2>
                <Row>
                    <Col>
                        <img src="./img/cnpq.jpg" alt="Logo-parceiro"/>
                    </Col>
                    
                    <Col>
                        <img src="./img/fapema.jpg" alt="Logo-parceiro"/>
                    </Col>

                    <Col>
                        <img src="./img/pecs.jpg" alt="Logo-parceiro"/>
                    </Col>

                    <Col>
                        <img src="./img/engcomp.png" alt="Logo-parceiro" />
                    </Col>

                </Row>

                <Row>

                    <Col>
                        <img src="./img/usp.jpg" alt="Logo-parceiro"/>
                    </Col>

                    <Col>
                        <img src="./img/ifam.jpg" alt="Logo-parceiro"/>
                    </Col>

                    <Col>
                        <img src="./img/fapead.jpg" alt="Logo-parceiro"/>
                    </Col>

                    <Col>
                        <img src="./img/abtelecom.jpg" alt="Logo-parceiro"/>
                    </Col>
                    
                </Row>

                <Row>
                    <Col>
                        <img src="./img/fiema.jpg" alt="Logo-parceiro"/>
                    </Col>

                    <Col>
                        <img src="./img/celplan.jpg" alt="Logo-parceiro"/>
                    </Col>

                    <Col>
                        <img src="./img/lig16.jpg" alt="Logo-parceiro"/>
                    </Col>

                    <Col>
                        <img src="./img/cisco.jpg" alt="Logo-parceiro"/>
                    </Col>
                    
                </Row>

                <Row>
                    <Col>
                        <img src="./img/anatel.jpg" alt="Logo-parceiro"/>
                    </Col>

                    <Col>
                        <img src="./img/tvn.jpg" alt="Logo-parceiro"/>
                    </Col>

                    <Col>
                        <img src="./img/cla.jpg" alt="Logo-parceiro"/>
                    </Col>

                    <Col>
                        <img src="./img/crea.jpg" alt="Logo-parceiro"/>
                    </Col>

                </Row>

            </Container>
        </div>
    );
}