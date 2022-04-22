import AdminHeader from "../../components/AdminHeader";
import { MdOutlineArticle } from 'react-icons/md';
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';
import './dashboardarticles.css';
import Title from "../../components/Title";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from '../../services/firebaseConnection';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import ArticleModal from "../../components/ArticleModal";


export default function DashboardArticles() {
    const history = useHistory();

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [showPostModal, setShowPostModal] = useState(false);
    const [currentArticle, setCurrentArticle] = useState();

    const listRef = firebase.firestore().collection('articles').orderBy('created', 'desc');


    useEffect(() => {

        loadArticles();

        return () => {

        }

    }, [])

    async function loadArticles() {
        await listRef.limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot);
        })
        .catch((error) => {
            console.log("Erro ao carregar artigos: ", error);
            setLoadingMore(false);
        })

        setLoading(false);
    }

    async function updateState(snapshot) {
        const isCollecttionEmpty = snapshot.size === 0;

        if (!isCollecttionEmpty) {
            let articleList = [];

            snapshot.forEach((doc) => {
                articleList.push({
                    id: doc.id,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy HH:mm:ss'),
                    title: doc.data().title,
                    authors: doc.data().authors,
                    abstract: doc.data().abstract,
                    articleUrl: doc.data().articleUrl
                })
            })

            const lastDoc = snapshot.docs[snapshot.docs.length -1];
            setArticles(prevArticles => [...prevArticles, ...articleList]);
            setLastDocs(lastDoc);
        } else {
            setIsEmpty(true);
        }

        setLoadingMore(false);
    }

    async function handleMore() {
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot);
        })
    }




    function togglePostModal(article) {
        setShowPostModal(!showPostModal);
        setCurrentArticle(article);
    }

    if (loading) {
        return(
            <div className="dashboard-articles">
                <AdminHeader/>


                <div className='content'>
                    <Title name="Artigos">
                        <MdOutlineArticle size={25} />
                    </Title>


                    <div className='special-container dashboard-empty'>
                        <span>Buscando artigos...</span>
                    </div>

                </div>
            </div>
        );
    }

    return(
        <div className="dashboard-articles">
            <AdminHeader />

            <div className="content">
                <Title name="Artigos">
                    <MdOutlineArticle size={25} />
                </Title>

                {articles.length !== 0 ? (
                    <>
                        <Link to="/admin/compose/article" className="new-btn">
                            <FiPlus size={25} color="#FFF" />
                            Novo artigo
                        </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Título</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article, index) => {
                                    return(
                                        <tr key={index}>
                                            <td data-label="Título" className="td-title">{article.title}</td>
                                            <td data-label="Cadastrado em">{article.createdFormated}</td>
                                            <td data-label="#">
                                                <button className='action' style={{ backgroundColor: '#3583f6' }} onClick={ () => togglePostModal(article)} >
                                                    <FiSearch color='#FFF' size={17} />
                                                </button>
                                                <Link className="action" style={{ backgroundColor: '#F6A935'}} to={`/admin/compose/article/${article.id}`} >
                                                    <FiEdit2 color="#FFF" size={17} />
                                                </Link>
                                                <button className="action" style={{ backgroundColor: '#B20600'}} onClick={async () => {
                                                    await firebase.firestore().collection('articles').doc(article.id).delete()
                                                        .then(() => {
                                                            toast.success('Artigo excluído com sucesso!');
                                                            history.push('/admin');
                                                        })
                                                        .catch((error) => {
                                                            console.log("Erro ao excluir artigo: ", error);
                                                            toast.error("Erro ao excluir artigo.");
                                                        })
                                                    }}
                                                >
                                                    <FiTrash2 color="#fff" size={17} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        
                        {loadingMore && <p style={{ textAlign: 'center', marginTop: 15 }}>Buscando artigos...</p>}
                        { !loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}

                    </>
                ) : (
                    <div className="special-container dashboard-empty">
                        <span>Nenhum artigo registrado</span>

                        <Link to="/admin/compose/article" className="new-btn">
                            <FiPlus size={25} color="#FFF" />
                            Novo artigo
                        </Link>
                    </div>
                )}
            </div>

            {showPostModal && (
                <ArticleModal 
                    article={currentArticle}
                    close={togglePostModal}
                />
            )}

        </div>
    );
}