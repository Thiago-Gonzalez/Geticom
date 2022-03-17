import { Button, Container } from "react-bootstrap";
import Header from '../../components/Header/index';
import appConfig from '../../config.json';
import './notfound.css';

import { useHistory } from "react-router-dom";

export default function NotFound() {

    const history = useHistory();

    function returnHome() {
        history.push("/");
    }

    return(
            <Container fluid className="notfound">
                <Header 
                    heading={appConfig.headerContent.notFound.heading}
                    paragraph={appConfig.headerContent.notFound.paragraph}
                />
                <Button variant="link" onClick={returnHome}>Retornar</Button>
            </Container>
    );
}