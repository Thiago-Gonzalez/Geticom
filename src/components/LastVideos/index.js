import { Player, Poster, Ui, Youtube } from '@vime/react';
import { Spinner } from 'react-bootstrap';
import './lastvideos.css';

export default function LastVideos() {

    return(
        <div className="last-videos colored-section">
            <h1>Últimos vídeos</h1>

            <div className="embed-container">
                <Player controls>
                      <Youtube videoId="https://youtube.com/playlist?list=UULFwIX8GHoQlg2X-MT14UbOpA"/>
                  <Ui>
                    <Spinner />
                    <Poster />
                  </Ui>
                </Player>
            </div>
                
            <a href="https://www.youtube.com/channel/UCwIX8GHoQlg2X-MT14UbOpA" target="_blank" rel='noopener noreferrer'>Ver mais vídeos</a>
        </div>
    );
}
