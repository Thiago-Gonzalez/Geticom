import { Card, Col } from "react-bootstrap";
import './servicecard.css';

export default function ServiceCard ({ service }) {
    return (
        <Col className="column" xl={4} lg={6} md={12} sm={12}>
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