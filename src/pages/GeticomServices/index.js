import Header from '../../components/Header';
import { Container } from 'react-bootstrap';
import '../style.css';
import Footer from '../../components/Footer';
import appConfig from '../../config.json';
import ServicesAndResearches from '../../components/ServicesAndResearches';
import Testimonials from '../../components/Testimonials';
import Contacts from '../../components/Contacts';

export default function GeticomServices () {

    return (
        <div className='services-page'>
            <Container fluid>
                <Header
                    headerHeading={appConfig.headerContent.services.heading} 
                    headerParagraph={appConfig.headerContent.services.paragraph}
                />
                <ServicesAndResearches
                    services={appConfig.services}
                    researches={appConfig.researches}
                />
                <Testimonials 
                    testimonials={appConfig.testimonials}
                />
                <Contacts 
                    contacts={appConfig.contacts}
                />
                <Footer />
            </Container>
        </div>
    );
}