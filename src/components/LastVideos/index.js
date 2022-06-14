
import './lastvideos.css';

export default function LastVideos() {

    return(
        <div className="last-videos colored-section">
            <h1>Últimos vídeos</h1>

            <div className="embed-container">
                <iframe 
                    width="480" 
                    height="270" 
                    src="https://www.youtube.com/embed/videoseries?list=UUzg1WcH6uagZpzL_K3a0ydQ" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;" 
                >
                </iframe>
            </div>
                
            <a href="https://www.youtube.com/channel/UCzg1WcH6uagZpzL_K3a0ydQ" target="_blank" rel='noopener noreferrer'>Ver mais vídeos</a>
        </div>
    );
}