import { Container, Row, Button } from "react-bootstrap";
import './style.css';

export default function LastVideos() {
    return(
        <div className="last-videos">
            <Container>
                <h2>Últimos vídeos</h2>
                <Row>
                    <iframe width="560" height="400" src="https://www.youtube.com/embed/videoseries?list=PLcRAK6ryeB9N88QVeelLQ0CjH50DZSBy0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;" allowfullscreen></iframe>
                </Row>
                <a href="https://www.youtube.com/channel/UCwIX8GHoQlg2X-MT14UbOpA"><Button variant="link">Ver mais vídeos</Button></a>
            </Container>
        </div>
    );
}