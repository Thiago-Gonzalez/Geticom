import { Container, Carousel } from "react-bootstrap";
import './style.css';

export default function Testimonials (props) {
    return (
        <div className="testimonials">
            <Container>
                <Carousel>
                    {props.testimonials.map( (testimonial) => {
                        return (
                            <Carousel.Item>
                                <Carousel.Caption>
                                    <h4>"{testimonial.content}"</h4>
                                    <p>{testimonial.author}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </Container>
        </div>
    );
}