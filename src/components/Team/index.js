import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Coordinators from "../Coordinators";
import './team.css';


export default function Team({ coordinators, researchers }) {
    const history = useHistory();
    
    return (
        <Container className="team">
            <h1>Conheça nossa equipe</h1>
            <h2>Coordenadores</h2>
            <Coordinators coordinators={coordinators} />
            <h2>Docentes e pesquisadores</h2>

            <Row className="researches">
                {researchers.map((researcher, index) => {
                    return (
                        <Col className="column" sm={6} lg={6} xl={4} key={index} >
                            <Card style={{ width: '15rem' }}>
                                <Card.Img variant="top" src={require(`../../assets/img/${researcher.img}`)} />
                                <Card.Body>
                                    <Card.Title><a href={researcher.social} target="_blank" rel="noreferrer">{researcher.name}</a></Card.Title>
                                    <Card.Text>
                                        {researcher.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })} 
            </Row>

            <div className="btn-div">
                <Button variant="link" onClick={() =>  history.push("/servicos")}>Conheça nossos serviços</Button>
            </div>
        </Container>
    );
}