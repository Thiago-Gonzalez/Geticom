import './articlemodal.css';

import { FiX} from 'react-icons/fi';
import { HiOutlineDocumentDownload } from 'react-icons/hi';

export default function ArticleModal({article, close}) {
    return(
        <div className='article-modal'>
            <div className='container'>
                <button className='close' onClick={ close }>
                    <FiX size={23} color="#FFF" />
                    Voltar
                </button>

                <div>

                    <div className='modal-row'>
                        <h2>{article.title}</h2>
                    </div>
                    <div className='modal-row'>
                        <span><b>Publicado em:</b> {article.createdFormated}</span>
                        <span><b>Autores:</b> {article.authors}</span>
                    </div>
                    <div className='modal-row'>
                        <p>{article.abstract}</p>
                    </div>
                    <div className='modal-row'>
                        <a 
                            href={article.articleUrl} 
                            download 
                            target="_blank" 
                            rel='noreferrer'
                        >
                            <HiOutlineDocumentDownload size={24} /> 
                            Baixar artigo
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}