import { Col, Container, Row } from 'react-bootstrap';
import './footer.css';

import uema from "../../assets/img/uema-logo.png";

export default function Footer() {
    return (
        <footer>
            <Container className='footer'>
                <Row>
                    <Col lg={4} md={4} sm={4}>
                        <img src={uema} alt="Logo UEMA" />
                    </Col>
                    <Col lg={8} md={8} sm={8}>
                        <p>Grupo de Estudos em Tecnologias de Informação e Comunicações sem Fio | Todos os direitos reservados</p>
                        <p>Cidade Universitária Paulo VI, S/N - UEMA | 65055-000 | São Luís - MA</p>
                        <p>Tel.: (98) 9 8347-1218 - Prof. Leonardo Gonsioroski</p>
                        <p>email: leonardohgfs@hotmail.com</p>
                    </Col>
                </Row>
            </Container>

            <p className='footer-dev'>© Desenvolvido por <a href="https://beacons.ai/thiago.gonzalez">Thiago González</a></p>
        </footer>
    );
}