import { Button, Col, Container, Row } from "react-bootstrap";
import { Link} from "react-router-dom";
import Coordinators from "../Coordinators";
import './style.css';


export default function Team(props) {
    
    return (
        <div className="team">
            <Container>
                <h2>Conheça nossa equipe</h2>
                <h4>Coordenadores</h4>
                <Coordinators coordinators={props.coordinators} />
                <h4>Docentes e pesquisadores</h4>
                <Row>
                    <Col lg={6}>
                        {props.researchers.slice(0, props.researchers.length/2).map((researcher) => {
                            return (
                                <div className="researcher-info">
                                    <a href={researcher.lattes}><h6>{researcher.name}</h6></a>
                                    <p >{researcher.description}</p>
                                </div>
                            );
                        })}    
                    </Col>
                    <Col lg={6}>
                        {props.researchers.slice(props.researchers.length/2).map((researcher) => {
                            return (
                                <div className="researcher-info" >
                                    <a href={researcher.lattes}><h6>{researcher.name}</h6></a>
                                    <p >{researcher.description}</p>
                                </div>
                            );
                        })}    
                    </Col>
                </Row>
                <div className="btn-div">
                    <Link to="/servicos"><Button variant="link">Conheça nossos serviços</Button></Link>
                    <span>
                        ?
                        <p>Ao clicar no nome de um dos Docentes ou Pesquisadores, você será redirecionado para à página do currículo lattes a ele associada</p>
                    </span>
                </div>
            </Container>
        </div>
    );
}