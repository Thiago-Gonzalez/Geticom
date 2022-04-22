import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import Title from "../../components/Title";


import { MdOutlineHighlight } from 'react-icons/md';
import { FiEdit2, FiSearch, FiPlus, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import './dashboardhighlights.css';
import { Link } from "react-router-dom";
import HighlightModal from "../../components/HighlightModal";

import firebase from '../../services/firebaseConnection';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function DashboardHighlights() {
    const history = useHistory();

    const [highlights, setHighlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [showPostModal, setShowPostModal] = useState(false);
    const [currentHighlight, setCurrentHighlight] = useState();

    const listRef = firebase.firestore().collection('highlights').orderBy('created', 'desc');

    useEffect(() => {

        loadHighlights();

        return () => {

        }

    }, [])

    async function loadHighlights() {
        await listRef.limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot);
        })
        .catch((error) => {
            console.log("Erro ao carregar destaques: ", error);
            setLoadingMore(false);
        })

        setLoading(false);
    }

    async function updateState(snapshot) {
        const isCollecttionEmpty = snapshot.size === 0;

        if (!isCollecttionEmpty) {
            let highlightList = [];

            snapshot.forEach((doc) => {
                highlightList.push({
                    id: doc.id,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy HH:mm:ss'),
                    title: doc.data().title,
                    imgUrl: doc.data().imgUrl,
                    content: doc.data().content,
                    link: doc.data().link,
                    filesUrl: doc.data().filesUrl
                })
            })

            const lastDoc = snapshot.docs[snapshot.docs.length -1];
            setHighlights(prevHighlights => [...prevHighlights, ...highlightList]);
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

    function togglePostModal(highlight) {
        setShowPostModal(!showPostModal);
        setCurrentHighlight(highlight);
    }

    if (loading) {
        return(
            <div className="dashboard-highlights">
                <AdminHeader/>


                <div className='content'>
                    <Title name="Destaques">
                        <MdOutlineHighlight size={25} />
                    </Title>


                    <div className='special-container dashboard-empty'>
                        <span>Buscando destaques...</span>
                    </div>

                </div>
            </div>
        );
    }

    return(
        <div className="dashboard-highlights">
            <AdminHeader />

            <div className="content">
                <Title name="Destaques">
                    <MdOutlineHighlight size={25} /> 
                </Title>

                {highlights.length !== 0 ? (
                    <>
                        <Link to="/admin/compose/highlight" className="new-btn">
                            <FiPlus size={25} color="#FFF" />
                            Novo destaque
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
                                {highlights.map((highlight, index) => {
                                    return(
                                        <tr key={index}>
                                            <td data-label="Título" className="td-title">{highlight.title}</td>
                                            <td data-label="Cadastrado em">{highlight.createdFormated}</td>
                                            <td data-label="#">
                                                <button className='action' style={{ backgroundColor: '#3583f6' }} onClick={ () => togglePostModal(highlight)} >
                                                    <FiSearch color='#FFF' size={17} />
                                                </button>
                                                <Link className="action" style={{ backgroundColor: '#F6A935'}} to={`/admin/compose/highlight/${highlight.id}`} >
                                                    <FiEdit2 color="#FFF" size={17} />
                                                </Link>
                                                <button className="action" style={{ backgroundColor: '#B20600'}} onClick={async () => {
                                                    await firebase.firestore().collection('highlights').doc(highlight.id).delete()
                                                        .then(() => {
                                                            toast.success('Destaque excluído com sucesso!');
                                                            history.push('/admin');
                                                        })
                                                        .catch((error) => {
                                                            console.log("Erro ao excluir destaque: ", error);
                                                            toast.error("Erro ao excluir destaque.");
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
                        
                        {loadingMore && <p style={{ textAlign: 'center', marginTop: 15 }}>Buscando destaques...</p>}
                        { !loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}

                    </>
                ) : (
                    <div className="special-container dashboard-empty">
                        <span>Nenhum destaque registrado</span>

                        <Link to="/admin/compose/highlight" className="new-btn">
                            <FiPlus size={25} color="#FFF" />
                            Novo destaque
                        </Link>
                    </div>
                )}
            </div>

            {showPostModal && (
                <HighlightModal 
                    highlight={currentHighlight}
                    close={togglePostModal}
                />
            )}
        </div>
    );
}