import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from '../../components/Header/index';
import appConfig from '../../config.json';
import './style.css';

export default function NotFound() {

    return(
        <div className="not-found">
            <Container fluid>
                <Header 
                    headerHeading={appConfig.headerContent.notFound.heading}
                    headerParagraph={appConfig.headerContent.notFound.paragraph}
                />
                <Link to="/"><Button variant="link">Retornar</Button></Link>
                <Footer />
            </Container>
        </div>
    );
}