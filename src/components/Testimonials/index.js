import { Carousel } from "react-bootstrap";
import './testimonials.css';

export default function Testimonials ({ testimonials }) {
    return (
        <div className="testimonials">
            <Carousel>
                {testimonials.map( (testimonial) => {
                    return (
                        <Carousel.Item>
                            <Carousel.Caption>
                                <h2>"{testimonial.content}"</h2>
                                <p>{testimonial.author}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </div>
    );
}