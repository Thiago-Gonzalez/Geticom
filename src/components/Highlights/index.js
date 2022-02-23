import { Container, Carousel } from "react-bootstrap";
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
                                <img
                                    className="d-block carousel-img"
                                    src={highlight.imgPath}
                                    alt={"Imagem de destaque - slide " + highlight.id}
                                />
                                <Carousel.Caption>
                                    <p className="carousel-title">{highlight.title}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        );
                    })}
                    </Carousel>
            </Container>
        </div>
    );
}