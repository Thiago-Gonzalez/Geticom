import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import './highlight.css';

export default function Highlight ({ highlight }) {

    const history = useHistory();
    
    return (
        <Container className="highlight">
            <h1>{highlight.title}</h1>
            <span><b>Publicado em:</b> {"18/04/2022 10:35"} - <b>Fonte:</b> {"Assessoria de Comunicação GETICOM"}</span>
            <img src={require(`../../assets/img/${highlight.img}`)} alt="imagem-destaque" />
            <p>{highlight.content}{highlight.link && <a href={highlight.link}> {highlight.link}</a>}</p>
            <Button variant="link" onClick={() => history.push("/")}>Retornar</Button>
        </Container>
    ); 
}