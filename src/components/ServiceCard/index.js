import { Card, Col } from "react-bootstrap";
import './servicecard.css';

export default function ServiceCard ({ service }) {
    return (
        <Col xl={4} lg={6} md={6} sm={6}>
            <Card>
                <Card.Header as="h4">{service.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {service.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}