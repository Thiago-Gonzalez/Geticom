import { Container } from "react-bootstrap";
import appConfig from '../../config.json';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NotFound from "../NotFound";
import { useParams } from "react-router-dom";
import './highlight.css';
import Highlight from "../../components/Highlight";

export default function HighlightPage () {
    const { id, title } = useParams();

    const highlight = appConfig.highlights.find( (highlight) => {
        return highlight.id === parseInt(id) && highlight.title.replaceAll(" ", "-").toLowerCase() === title.toLowerCase() ? highlight : undefined;
    });

    return (
        <>
            {highlight !== undefined ? (

                <Container fluid className="highlight-page">
                    <Header 
                        heading={appConfig.headerContent.highlight.heading} 
                        paragraph={appConfig.headerContent.highlight.paragraph}
                    />

                    <Highlight
                        highlight={highlight}
                    />

                    <Footer />
                </Container>
            ) : (
                <NotFound/>
            )}
        </>
    );
}