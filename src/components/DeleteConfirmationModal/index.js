import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import './deleteconfirmationmodal.css';
import { useHistory } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { HiOutlineDocumentDownload } from 'react-icons/hi';

export const DeleteConfirmationModal = ({ postType, post, close, onConfirm }) => {
    const history = useHistory();

    const deleteHighlight = async () => {
        await firebase.firestore().collection('highlights').doc(post.id).delete()
            .then(() => {
                toast.success('Destaque excluído com sucesso!');
                history.push('/admin');
            })
            .catch((error) => {
                console.log("Erro ao excluir destaque: ", error);
                toast.error("Erro ao excluir destaque.");
            })
    }

    const deleteArticle = async () => {
        await firebase.firestore().collection('articles').doc(post.id).delete()
            .then(() => {
                toast.success('Artigo excluído com sucesso!');
                history.push('/admin');
            })
            .catch((error) => {
                console.log("Erro ao excluir artigo: ", error);
                toast.error("Erro ao excluir artigo.");
            })
        }

    const handleDelete = () => {
        if (onConfirm) {
            onConfirm();
        } else if (postType === 'highlight') {
            deleteHighlight();
        } else {
            deleteArticle();
        }
    };

    return (
        <div className="delete-confirmation-modal">
            <div className="container">
                <button className='close' onClick={ close }>
                    <FiX size={23} color="#FFF" />
                </button>

                <div>
                    <div className='modal-row'>
                        <h1>Tem certeza que deseja excluir este {postType === 'highlight' ? 'destaque' : 'artigo'}?</h1>
                    </div>
                    {postType === 'highlight' ? (
                        <>
                            <div className='modal-row'>
                                <h2>{post.title}</h2>
                            </div>
                            <div className='modal-row'>
                                <span><b>Publicado em:</b> {post.createdFormated} <b>Fonte:</b> Assessoria de Comunicação GETICOM</span>
                            </div>
                            <div className='modal-row'>
                                <img src={post.imgUrl} alt="imagem-destaque" />
                            </div>
                            <div className='modal-row'>
                                <p>{ post.content } { post.link && post.link }</p>
                            </div>
                            <div className='modal-row'>
                                {[...post.filesUrl].map((fileUrl, index) => {
                                    return(
                                        <a 
                                            href={fileUrl} 
                                            download 
                                            target="_blank" 
                                            rel='noopener noreferrer'
                                            key={index}
                                        >
                                            <HiOutlineDocumentDownload size={24} /> 
                                            Download
                                        </a>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='modal-row'>
                                <h2>{post.title}</h2>
                            </div>
                            <div className='modal-row'>
                                <span><b>Publicado em:</b> {post.createdFormated}</span>
                                <span><b>Autores:</b> {post.authors}</span>
                            </div>
                            <div className='modal-row'>
                                <p>{post.abstract}</p>
                            </div>
                            <div className='modal-row'>
                                <a 
                                    href={post.articleUrl} 
                                    download 
                                    target="_blank" 
                                    rel='noreferrer'
                                >
                                    <HiOutlineDocumentDownload size={24} /> 
                                    Baixar artigo
                                </a>
                            </div>
                        </>
                    )}
                    <div className='confirmation'>
                        <button className='confirmation-btn confirm' onClick={ handleDelete }>Excluir</button>
                        <button className='confirmation-btn decline' onClick={ close }>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}