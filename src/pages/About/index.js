import Header from '../../components/Header';
import Team from '../../components/Team';
import { Container } from 'react-bootstrap';
import Footer from '../../components/Footer';
import appConfig from '../../config.json';
import './about.css';

export default function About () {

    return (
            <Container fluid className='about'>
                <Header
                    heading={appConfig.headerContent.about.heading} 
                    paragraph={appConfig.headerContent.about.paragraph}
                />
                <Team
                    coordinators={appConfig.coordinators}
                    researchers={appConfig.researchers}
                />
                <Footer />
            </Container>
    );
}