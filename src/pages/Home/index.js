import { Container } from 'react-bootstrap';

import Header from '../../components/Header';
import Highlights from '../../components/Highlights';
import Footer from '../../components/Footer';
import Partnerships from '../../components/Partnerships';
import LastVideos from '../../components/LastVideos';
import Researchers from '../../components/Researchers';
import LastArticles from '../../components/LastArticles';

import appConfig from '../../config.json';

import './home.css';

export default function Home () {

    return (
        <Container fluid>
            <Header />

            <Highlights />

            <Researchers />

            <LastArticles />

            <LastVideos />
            
            <Partnerships />

            <Footer />
        </Container>
    );
}