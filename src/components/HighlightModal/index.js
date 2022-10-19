import './highlightmodal.css';

import { FiX} from 'react-icons/fi';
import { HiOutlineDocumentDownload } from 'react-icons/hi';


export default function HighlightModal({highlight, close}) {

    return (
        <div className='highlight-modal'>
            <div className='container'>
                <button className='close' onClick={ close }>
                    <FiX size={23} color="#FFF" />
                    Voltar
                </button>

                <div>

                    <div className='modal-row'>
                        <h2>{highlight.title}</h2>
                    </div>
                    <div className='modal-row'>
                        <span><b>Publicado em:</b> {highlight.createdFormated} <b>Fonte:</b> Assessoria de Comunicação GETICOM</span>
                    </div>
                    <div className='modal-row'>
                        <img src={highlight.imgUrl} alt="imagem-destaque" />
                    </div>
                    <div className='modal-row'>
                        <p>{ highlight.content } { highlight.link && highlight.link }</p>
                    </div>
                    <div className='modal-row'>
                        {[...highlight.filesUrl].map((fileUrl, index) => {
                            return(
                                <a 
                                    href={fileUrl} 
                                    download 
                                    target="_blank" 
                                    rel='noopener noreferrer'
                                    key={index}
                                >
                                    <HiOutlineDocumentDownload size={24} /> 
                                    Baixar
                                </a>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
}