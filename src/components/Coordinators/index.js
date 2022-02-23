import { Card, Col, Row } from "react-bootstrap";
import './style.css';

export default function Coordinators (props) {
    return (
        <>
            <Row>
                {props.coordinators.map( (coordinator) => {
                    return (
                        <Col sm={6} lg={3}>
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
        </>
    );
}