import Header from '../../components/Header';
import Team from '../../components/Team';
import { Container } from 'react-bootstrap';
import '../style.css';
import Footer from '../../components/Footer';
import appConfig from '../../config.json';

export default function About () {

    return (
        <div className='about'>
            <Container fluid>
                <Header
                headerHeading={appConfig.headerContent.about.heading} 
                headerParagraph={appConfig.headerContent.about.paragraph}
                />
                <Team
                    coordinators={appConfig.coordinators}
                    researchers={appConfig.researchers}
                />
                <Footer />
            </Container>
        </div>
    );
}