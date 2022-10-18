import { Card, Col } from "react-bootstrap";
import './servicecard.css';

export default function ServiceCard ({ service, slideNum }) {
    return (
        <div className={`column keen-slider__slide number-slide${slideNum}`}>
            <div className="custom-card">
                <div className="custom-card-header">
                    <h4>{service.title}</h4>
                </div>

                <div className="custom-card-body">
                    <p className="custom-card-text">{service.description}</p>
                </div>
            </div>
        </div>
    );
}