import { Container } from "react-bootstrap";
import Header from '../../components/Header/index';
import './notfound.css';

import Footer from '../../components/Footer';

export default function NotFound() {

    return(
        <Container fluid className="notfound">
            <Header />
            <div className="notfound-content">
                <h1>Página não encontrada!</h1>
                <p>Ops, não foi possível encontrar a página que você está buscando.</p>
            </div>
            <Footer />
        </Container>
    );
}