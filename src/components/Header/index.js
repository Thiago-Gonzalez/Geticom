import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './header.css';

export default function Header({ heading, paragraph }) {
    return (
        <header>
            <Navbar expand="xl">
                <Container>
                    <Link to="/"><Navbar.Brand as="h1">Geticom</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav as="ul" className="me-auto">
                            <Link to="/">Início</Link>
                            <Link to="/sobre">Sobre</Link>
                            <Link to="/servicos">Serviços</Link>
                            <a href="/servicos#contatos">Contate-nos</a>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <div className='header-content'>
                <h1>{heading}</h1>
                <p>{paragraph}</p>
            </div>
        </header>
    );
}