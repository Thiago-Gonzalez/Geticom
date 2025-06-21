import { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { FiEdit2, FiSearch, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Link } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import Title from "../../components/Title";
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';
import TalentModal from '../../components/TalentModal';
import TalentDeleteModal from '../../components/TalentDeleteModal';
import { toast } from 'react-toastify';
import "./dashboardtalent.css";

export default function DashboardTalents()
{
    const [talents, setTalents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [showTalentModal, setShowTalentModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [currentTalent, setCurrentTalent] = useState();

    const listRef = firebase.firestore().collection('talents').orderBy('created', 'desc');

    useEffect(() => {
        loadTalents();
        return () => {};
    }, []);

    async function loadTalents() {
        await listRef.limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot);
        })
        .catch((error) => {
            console.log("Erro ao carregar talentos: ", error);
            setLoadingMore(false);
        });
        setLoading(false);
    }

    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;
        if (!isCollectionEmpty) {
            let talentList = [];
            snapshot.forEach((doc) => {
                talentList.push({
                    id: doc.id,
                    created: doc.data().created,
                    createdFormated: doc.data().created ? format(doc.data().created.toDate(), 'dd/MM/yyyy HH:mm:ss') : '',
                    name: doc.data().name,
                    course: doc.data().course,
                    semester: doc.data().semester,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    skills: doc.data().skills,
                    availability: doc.data().availability,
                    linkedin: doc.data().linkedin,
                    github: doc.data().github,
                    portfolio: doc.data().portfolio,
                    imageUrl: doc.data().imageUrl,
                    experience: doc.data().experience,
                    notes: doc.data().notes
                });
            });
            const lastDoc = snapshot.docs[snapshot.docs.length - 1];
            setTalents(prev => [...prev, ...talentList]);
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
        });
    }

    function toggleTalentModal(talent) {
        setShowTalentModal(!showTalentModal);
        setCurrentTalent(talent);
    }

    function toggleDeleteConfirmationModal(talent) {
        setShowDeleteConfirmationModal(!showDeleteConfirmationModal);
        setCurrentTalent(talent);
    }

    async function handleDeleteTalent() {
        if (!currentTalent) return;
        try {
            // Excluir imagem do Storage se existir
            if (currentTalent.imageUrl) {
                const storageRef = firebase.storage().refFromURL(currentTalent.imageUrl);
                await storageRef.delete();
            }
            // Excluir do Firestore
            await firebase.firestore().collection('talents').doc(currentTalent.id).delete();
            setTalents(prev => prev.filter(t => t.id !== currentTalent.id));
            setShowDeleteConfirmationModal(false);
            toast.success('Talento excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir talento:', error);
            toast.error('Erro ao excluir talento.');
        }
    }

    if (loading) {
        return (
            <div className="dashboard-talents">
                <AdminHeader />
                <div className='content'>
                    <Title name="Talentos">
                        <FaUserGraduate size={25} />
                    </Title>
                    <div className='special-container dashboard-empty'>
                        <span>Buscando talentos...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-talents">
            <AdminHeader />
            <div className="content">
                <Title name="Talentos">
                    <FaUserGraduate size={25} />
                </Title>
                {talents.length !== 0 ? (
                    <>
                        <Link to="/admin/cadastrar/talento" className="new-btn">
                            <FiPlus size={25} color="#FFF" />
                            Novo talento
                        </Link>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Curso</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {talents.map((talent, index) => (
                                    <tr key={index}>
                                        <td data-label="Nome" className="td-title">{talent.name}</td>
                                        <td data-label="Curso">{talent.course} {talent.semester ? `- ${talent.semester}º semestre` : ''}</td>
                                        <td data-label="Cadastrado em">{talent.createdFormated}</td>
                                        <td data-label="#">
                                            <button className='action' style={{ backgroundColor: '#3583f6' }} onClick={() => toggleTalentModal(talent)}>
                                                <FiSearch color='#FFF' size={17} />
                                            </button>
                                            <Link className="action" style={{ backgroundColor: '#F6A935'}} to={`/admin/editar/talento/${talent.id}`}>
                                                <FiEdit2 color="#FFF" size={17} />
                                            </Link>
                                            <button className="action" style={{ backgroundColor: '#B20600'}} onClick={() => toggleDeleteConfirmationModal(talent)}>
                                                <FiTrash2 color="#fff" size={17} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {loadingMore && <p style={{ textAlign: 'center', marginTop: 15 }}>Buscando talentos...</p>}
                        {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}
                    </>
                ) : (
                    <div className="special-container dashboard-empty">
                        <span>Nenhum talento registrado</span>
                        <Link to="/admin/cadastrar/talento" className="new-btn">
                            <FiPlus size={25} color="#FFF" />
                            Novo talento
                        </Link>
                    </div>
                )}
            </div>
            {showTalentModal && (
                <TalentModal
                    show={showTalentModal}
                    onHide={toggleTalentModal}
                    talent={currentTalent}
                />
            )}
            {showDeleteConfirmationModal && (
                <TalentDeleteModal
                    show={showDeleteConfirmationModal}
                    onClose={toggleDeleteConfirmationModal}
                    onConfirm={handleDeleteTalent}
                />
            )}
        </div>
    );
};