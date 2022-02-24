import { Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import './style.css';


export default function Highlights(props) {

    const highlights = props.highlights.slice(-5);

    return(
        <div className="highlights">
            <h2>Destaques</h2>
            <Container>
                <Carousel>
                    {highlights.map( (highlight) => {
                        return (
                            <Carousel.Item>
                                <Link to={`/destaques/${highlight.title.replaceAll(" ", "-").toLowerCase()}`}>
                                    <img
                                        className="d-block carousel-img"
                                        src={highlight.imgPath}
                                        alt={"Imagem de destaque - slide " + highlight.id}
                                    />
                                </Link>
                                <Carousel.Caption>
                                    <Link to={`/destaques/${highlight.title.replaceAll(" ", "-").toLowerCase()}`}>
                                        <p className="carousel-title">{highlight.title}</p>
                                    </Link>
                                </Carousel.Caption>
                            </Carousel.Item>
                        );
                    })}
                    </Carousel>
            </Container>
        </div>
    );
}