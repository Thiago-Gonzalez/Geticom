import { Container, Row } from 'react-bootstrap';
import Contact from '../Contact';
import './style.css';

export default function Contacts (props) {
    return (
        <div id="contatos" className="contacts">
            <Container>
                <h2>Contatos</h2>
                <p className='time'>Atendimento: segunda à sexta das 8h às 18h</p>
                <Row>
                    {props.contacts.map( (contact) => {
                        return (
                            <Contact 
                                contact={contact}
                            />
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}