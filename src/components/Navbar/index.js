import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from "react-bootstrap";
import './style.css';

export default function Navigationbar() {
    return (
        <Navbar expand="xl">
            <Container>
                <Link to="/"><Navbar.Brand as="h1">Geticom</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav as="ul" className="me-auto">
                        <Link to="/">Início</Link>
                        <Link to="/sobre">Sobre</Link>
                        <Link to="/servicos">Serviços</Link>
                        <a href="/servicos#contatos">Contatos</a>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}