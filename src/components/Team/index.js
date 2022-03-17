import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Coordinators from "../Coordinators";
import './team.css';


export default function Team({ coordinators, researchers }) {
    const history = useHistory();

    function redirectToServices() {
        history.push("/servicos");
    }
    
    return (
        <Container className="team">
            <h1>Conheça nossa equipe</h1>
            <h2>Coordenadores</h2>
            <Coordinators coordinators={coordinators} />
            <h2>Docentes e pesquisadores</h2>
            <Row>
                <Col lg={6}>
                    {researchers.slice(0, researchers.length/2).map((researcher) => {
                        return (
                            <div className="researcher-info">
                                <a href={researcher.lattes}><h4>{researcher.name}</h4></a>
                                <p >{researcher.description}</p>
                            </div>
                        );
                    })}    
                </Col>
                <Col lg={6}>
                    {researchers.slice(researchers.length/2).map((researcher) => {
                        return (
                            <div className="researcher-info" >
                                <a href={researcher.lattes}><h4>{researcher.name}</h4></a>
                                <p >{researcher.description}</p>
                            </div>
                        );
                    })}    
                </Col>
            </Row>
            <div className="btn-div">
                <Button variant="link" onClick={redirectToServices}>Conheça nossos serviços</Button>
                <span>
                    ?
                    <p>Ao clicar no nome de um dos Docentes ou Pesquisadores, você será redirecionado para à página do currículo lattes a ele associada</p>
                </span>
            </div>
        </Container>
    );
}