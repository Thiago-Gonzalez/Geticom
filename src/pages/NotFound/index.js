import { Container } from "react-bootstrap";
import Header from '../../components/Header/index';
import appConfig from '../../config.json';
import './notfound.css';

import Footer from '../../components/Footer';

export default function NotFound() {

    return(
            <Container fluid className="notfound">
                <Header 
                    heading={appConfig.headerContent.notFound.heading}
                    paragraph={appConfig.headerContent.notFound.paragraph}
                />

                <Footer />
            </Container>
    );
}