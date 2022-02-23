import { Container } from "react-bootstrap";
import Header from '../../components/Header/index';

export default function NotFound() {
    const headerContent = {
        heading: "Página não encontrada!",
        paragraph: "Ops, ocorreu algum problema! Clique em um dos menus no topo da página para voltar a navegar"
    }

    return(
        <Container fluid>
            <Header 
                headerHeading={headerContent.heading}
                headerParagraph={headerContent.paragraph}
            />
        </Container>
    );
}