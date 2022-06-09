import { Col, Container, Row} from 'react-bootstrap';
import './contacts.css';

import { FiMail } from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';

export default function Contacts ({ contacts }) {
    return (
        <Container id="contatos" className="contacts">
            <h1>Contatos</h1>
            <h2>Horário de funcionamento:</h2>
            <p className='opening-hours'>Atendimento: segunda à sexta das 8h às 18h</p>
            <Row>
                {contacts.map((contact, index) => {
                    return (
                        <Col xl={6} lg={6} md={6} key={index} style={{'padding' : '0'}}>
                            <div className='contact-detail'>
                                <h4>{contact.name}</h4>
                                <p>
                                    <BsWhatsapp />
                                    {contact.phone}
                                </p>
                                <p>
                                    <FiMail />                   
                                    {contact.email}
                                </p>
                            </div>
                        </Col>
                    );
                })}
            </Row>
            
            
        </Container>

    );
}