
import {  Button } from "react-bootstrap";
import './lastvideos.css';

export default function LastVideos() {

    return(
        <div className="last-videos">
            <h1>Últimos vídeos</h1>

            <div className="embed-container">
                <iframe 
                    width="420" 
                    height="315" 
                    src="https://www.youtube.com/embed?listType=playlist&list=PLcRAK6ryeB9N88QVeelLQ0CjH50DZSBy0&loop=1&rel=0" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;" 
                    allowfullscreen>
                </iframe>
            </div>
                
            <a href="https://www.youtube.com/channel/UCwIX8GHoQlg2X-MT14UbOpA"><Button variant="link">Ver mais vídeos</Button></a>
        </div>
    );
}