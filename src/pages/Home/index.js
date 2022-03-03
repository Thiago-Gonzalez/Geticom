import Header from '../../components/Header';
import Highlights from '../../components/Highlights';
import { Container } from 'react-bootstrap';
import '../style.css';
import Researchers from '../../components/Researchers';
import Footer from '../../components/Footer';
import Partnerships from '../../components/Partnerships';
import LastArticles from '../../components/LastArticles';
import LastVideos from '../../components/LastVideos';
import appConfig from '../../config.json';

export default function Home () {

    return (
        <Container fluid>
            <Header
             headerHeading={appConfig.headerContent.home.heading} 
             headerParagraph={appConfig.headerContent.home.paragraph}
            />

            <Highlights 
                highlights={appConfig.highlights}
            />

            <Researchers
                coordinators={appConfig.coordinators}
            />

            <LastArticles 
                articles={appConfig.articles}
            />

            <LastVideos />
            
            <Partnerships />

            <Footer />
        </Container>
    );
}