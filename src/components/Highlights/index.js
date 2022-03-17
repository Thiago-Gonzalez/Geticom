import { Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import './highlights.css';
import  slide1  from '../../assets/img/destaque-slide1.jpg';


export default function Highlights({ highlights }) {


    return(
        <Container className="highlights">
            <h1>Destaques</h1>
            <Container>
                <Carousel>
                    {highlights.slice(-5).map( (highlight) => {
                        return (
                            <Carousel.Item>
                                <Link to={`/destaques/${highlight.id}/${highlight.title.replaceAll(" ", "-").toLowerCase()}`}>
                                    <img
                                        className="d-block carousel-img"
                                        src={slide1}
                                        alt={"Imagem de destaque - slide " + highlight.id}
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