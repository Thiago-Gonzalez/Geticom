import { Card, Col } from "react-bootstrap";
import './style.css';

export default function ServiceCard (props) {
    return (
        <Col xl={4} lg={6} md={6} sm={6}>
            <Card>
                <Card.Header as="h4">{props.service.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {props.service.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}