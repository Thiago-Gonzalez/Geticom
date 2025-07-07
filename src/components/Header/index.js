import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './header.css';
import logo from '../../assets/img/header-logo.png';

export default function Header() {
    const location = useLocation();

    return (
        <header>
            <Navbar expand="lg" className="modern-navbar" fixed="top">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} alt="Logo do Geticom" className="modern-logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto modern-nav">
                            <Link className={location.pathname === "/" ? "active" : ""} to="/">Início</Link>
                            <Link className={location.pathname === "/sobre" ? "active" : ""} to="/sobre">Sobre</Link>
                            <Link className={location.pathname === "/servicos" ? "active" : ""} to="/servicos">Serviços</Link>
                            <Link className={location.pathname === "/docentes" ? "active" : ""} to="/docentes">Docentes</Link>
                            <Link className={location.pathname === "/banco-de-talentos" ? "active" : ""} to="/banco-de-talentos">Banco de Talentos</Link>
                            <a href="/servicos#contatos">Contate-nos</a>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}