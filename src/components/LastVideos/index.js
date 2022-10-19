import { Player, Poster, Ui, Youtube } from '@vime/react';
import { Spinner } from 'react-bootstrap';
import './lastvideos.css';

export default function LastVideos() {

    return(
        <div className="last-videos colored-section">
            <h1>Últimos vídeos</h1>

            <div className="embed-container">
                <Player controls>
                      <Youtube videoId="https://www.youtube.com/embed/videoseries?list=UUzg1WcH6uagZpzL_K3a0ydQ"/>
                  <Ui>
                    {/* Vime components. */}
                    <Spinner />
                    {/* Pensar se tiro ou nao esse poster */}
                    <Poster />
                  </Ui>
                </Player>
            </div>
                
            <a href="https://www.youtube.com/channel/UCzg1WcH6uagZpzL_K3a0ydQ" target="_blank" rel='noopener noreferrer'>Ver mais vídeos</a>
        </div>
    );
}