import cnpq from "../../assets/img/cnpq.jpg";
import fapema from "../../assets/img/fapema.jpg";
import pecs from "../../assets/img/pecs.jpg";
import engcomp from "../../assets/img/engcomp.png";
import usp from "../../assets/img/usp.jpg";
import ifam from "../../assets/img/ifam.jpg";
import fapead from "../../assets/img/fapead.jpg";
import abtelecom from "../../assets/img/abtelecom.jpg";
import fiema from "../../assets/img/fiema.jpg";
import celplan from "../../assets/img/celplan.jpg";
import lig16 from "../../assets/img/lig16.jpg";
import cisco from "../../assets/img/cisco.jpg";
import anatel from "../../assets/img/anatel.jpg";
import tvn from "../../assets/img/tvn.jpg";
import cla from "../../assets/img/cla.jpg";
import crea from "../../assets/img/crea.jpg";
import { Col, Container, Row } from "react-bootstrap";
import './partnerships.css';

export default function Partnerships() {
    return (
        <Container className="partnerships">
            <h1>PARCERIAS</h1>
            <Row>
                <Col>
                    <img src={cnpq} alt="Logo-parceiro"/>
                </Col>
                
                <Col>
                    <img src={fapema} alt="Logo-parceiro"/>
                </Col>

                <Col>
                    <img src={pecs} alt="Logo-parceiro"/>
                </Col>

                <Col>
                    <img src={engcomp} alt="Logo-parceiro" />
                </Col>

            </Row>

            <Row>

                <Col>
                    <img src={usp} alt="Logo-parceiro"/>
                </Col>

                <Col>
                    <img src={ifam} alt="Logo-parceiro"/>
                </Col>

                <Col>
                    <img src={fapead} alt="Logo-parceiro"/>
                </Col>

                <Col>
                    <img src={abtelecom} alt="Logo-parceiro"/>
                </Col>
                
            </Row>

            <Row>
                <Col>
                    <img src={fiema} alt="Logo-parceiro"/>
                </Col>

                <Col>
                    <img src={celplan} alt="Logo-parceiro"/>
                </Col>

                <Col>
                    <img src={lig16} alt="Logo-parceiro"/>
                </Col>

                <Col>
                    <img src={cisco} alt="Logo-parceiro"/>
                </Col>
                
            </Row>

            <Row>
                <Col>
                    <img src={anatel} alt="Logo-parceiro"/>
                </Col>

                <Col>
                    <img src={tvn} alt="Logo-parceiro"/>
                </Col>

                <Col>
                    <img src={cla} alt="Logo-parceiro"/>
                </Col>

                <Col>
                    <img src={crea} alt="Logo-parceiro"/>
                </Col>

            </Row>

        </Container>
    );
}