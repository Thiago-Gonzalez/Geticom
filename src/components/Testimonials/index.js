import { Carousel } from "react-bootstrap";
import './testimonials.css';

export default function Testimonials ({ testimonials }) {
    return (
        <div className="testimonials colored-section">
            <Carousel>
                {testimonials.map( (testimonial, index) => {
                    return (
                        <Carousel.Item key={index}>
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