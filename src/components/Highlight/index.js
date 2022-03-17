import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import './highlight.css';

import slide1 from '../../assets/img/destaque-slide1.jpg';

export default function Highlight ({ highlight }) {

    const history = useHistory();
    
    return (
        <Container className="highlight">
            <h1>{highlight.title}</h1>
            <img src={slide1} alt="imagem-destaque" />
            <p>{highlight.content}</p>
            <Button variant="link" onClick={() => history.push("/")}>Retornar</Button>
        </Container>
    ); 
}