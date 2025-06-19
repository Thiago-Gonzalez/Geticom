import Header from '../../components/Header';
import { Container } from 'react-bootstrap';
import Footer from '../../components/Footer';
import appConfig from '../../config.json';
import ServicesAndResearches from '../../components/ServicesAndResearches';
import Testimonials from '../../components/Testimonials';
import Contacts from '../../components/Contacts';
import './services.css';

export default function ServicesPage () {

    return (
        <Container fluid  className='services'>
            <Header />

            
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
    );
}