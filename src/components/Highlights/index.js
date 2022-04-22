import { useContext } from "react";
import { Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HighlightsContext } from "../../contexts/highlights";
import './highlights.css';


export default function Highlights() {

    const { highlights } = useContext(HighlightsContext);


    return(
        <Container className="highlights">
            <h1>Destaques</h1>
            <Container>
                <Carousel>
                    {highlights.slice(0, 5).map( (highlight, index) => {
                        return (
                            <Carousel.Item key={index}>
                                <Link to={`/destaques/${highlight.id}/${highlight.title.replaceAll(" ", "-").toLowerCase()}`}>
                                    <img
                                        className="d-block carousel-img"
                                        src={highlight.imgUrl}
                                        alt={"Imagem de destaque"}
                                    />
                                </Link>
                                <Carousel.Caption>
                                    <Link to={`/destaques/${highlight.id}/${highlight.title.replaceAll(" ", "-").toLowerCase()}`}>
                                        <p className="carousel-title">{highlight.title}</p>
                                    </Link>
                                </Carousel.Caption>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </Container>
        </Container>
    );
}