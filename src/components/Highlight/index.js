import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import './highlight.css';

import { HiOutlineDocumentDownload } from 'react-icons/hi';

export default function Highlight ({ highlight }) {

    const history = useHistory();
    
    return (
        <Container className="highlight">
            <h1>{highlight.title}</h1>
            <span><b>Publicado em:</b> {highlight.createdFormated} - <b>Fonte:</b> {"Assessoria de Comunicação GETICOM"}</span>
            <img src={highlight.imgUrl} alt="imagem-destaque" />
            <p>{highlight.content}{highlight.link && <a href={highlight.link}> {highlight.link}</a>}</p>
            {[...highlight.filesUrl.map((fileUrl, index) => {
                return(
                    <a 
                        className="download-btn"
                        href={fileUrl} 
                        download 
                        target="_blank" 
                        rel='noopener noreferrer'
                        key={index}
                    >
                        <HiOutlineDocumentDownload size={24} /> 
                        Download
                    </a>
                );
            })]}
            <Button variant="link" onClick={() => history.push("/")}>Retornar</Button>
        </Container>
    ); 
}