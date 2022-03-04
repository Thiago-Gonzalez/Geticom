import { Card, Col } from "react-bootstrap";
import './style.css';

export default function Contact(props) {
    return (
        <Col xl={3} lg={6} md={6} sm={6}>
            <Card>
                <Card.Header as={"h4"}>{props.contact.name}</Card.Header>
                <Card.Body>
                     <p><img src="./img/whatsapp-icon.svg" alt="whatsapp-icon" style={{"height": "25px", "width": "25px"}} /> {props.contact.phone}</p>
                    <p><img src="./img/email-icon.svg" alt="email-icon" style={{"height": "25px", "width": "25px"}} /> {props.contact.email}</p>
                </Card.Body>
            </Card>
        </Col>
    );
}