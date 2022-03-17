import { Card, Col, Container, Row } from "react-bootstrap";
import './coordinators.css';

export default function Coordinators({ coordinators }) {
    return (
        <Container className="coordinators">
            <Row>
                {coordinators.map( (coordinator) => {
                    return (
                        <Col sm={6} lg={6} xl={3}>
                            <Card style={{ width: '15rem' }}>
                                <Card.Img variant="top" src={coordinator.img} />
                                <Card.Body>
                                    <Card.Title><a href={coordinator.lattes}>{coordinator.name}</a></Card.Title>
                                    <Card.Text>
                                        {coordinator.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}