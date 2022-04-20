
import './lastvideos.css';

export default function LastVideos() {

    return(
        <div className="last-videos">
            <h1>Últimos vídeos</h1>

            <div className="embed-container">
                <iframe 
                    width="480" 
                    height="270" 
                    src="https://www.youtube.com/embed?listType=playlist&list=PLcRAK6ryeB9N88QVeelLQ0CjH50DZSBy0&loop=1&rel=0" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;" 
                >
                </iframe>
            </div>
                
            <a href="https://www.youtube.com/channel/UCwIX8GHoQlg2X-MT14UbOpA" target="_blank" rel='noopener noreferrer'>Ver mais vídeos</a>
        </div>
    );
}