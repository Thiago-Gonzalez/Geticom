import { Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import './highlights.css';


export default function Highlights({ highlights }) {


    return(
        <Container className="highlights">
            <h1>Destaques</h1>
            <Container>
                <Carousel>
                    {highlights.slice(-5).reverse().map( (highlight, index) => {
                        return (
                            <Carousel.Item key={index}>
                                <Link to={`/destaques/${highlight.id}/${highlight.title.replaceAll(" ", "-").toLowerCase()}`}>
                                    <img
                                        className="d-block carousel-img"
                                        src={require(`../../assets/img/${highlight.img}`)}
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