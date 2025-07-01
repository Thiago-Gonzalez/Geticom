import { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiEdit2, FiSearch, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Link } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import Title from "../../components/Title";
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';
import FacultyModal from '../../components/FacultyModal';
import FacultyDeleteModal from '../../components/FacultyDeleteModal';
import { toast } from 'react-toastify';
import "./dashboardfaculty.css";

export default function DashboardFaculty()
{
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [showFacultyModal, setShowFacultyModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [currentFaculty, setCurrentFaculty] = useState();

    const listRef = firebase.firestore().collection('faculty').orderBy('created', 'desc');

    useEffect(() => {
        loadFaculty();
        return () => {};
    }, []);

    async function loadFaculty() {
        await listRef.limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot);
        })
        .catch((error) => {
            console.log("Erro ao carregar docentes: ", error);
            setLoadingMore(false);
        });
        setLoading(false);
    }

    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;
        if (!isCollectionEmpty) {
            let facultyList = [];
            snapshot.forEach((doc) => {
                facultyList.push({
                    id: doc.id,
                    created: doc.data().created,
                    createdFormated: doc.data().created ? format(doc.data().created.toDate(), 'dd/MM/yyyy HH:mm:ss') : '',
                    name: doc.data().name,
                    academicTitle: doc.data().academicTitle,
                    researchArea: doc.data().researchArea,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    biography: doc.data().biography,
                    disciplines: doc.data().disciplines,
                    academicFormation: doc.data().academicFormation,
                    publishedWorks: doc.data().publishedWorks || [],
                    linkedin: doc.data().linkedin,
                    lattes: doc.data().lattes,
                    imageUrl: doc.data().imageUrl
                });
            });
            const lastDoc = snapshot.docs[snapshot.docs.length - 1];
            setFaculty(prev => [...prev, ...facultyList]);
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

    function toggleFacultyModal(facultyMember) {
        setShowFacultyModal(!showFacultyModal);
        setCurrentFaculty(facultyMember);
    }

    function toggleDeleteConfirmationModal(facultyMember) {
        setShowDeleteConfirmationModal(!showDeleteConfirmationModal);
        setCurrentFaculty(facultyMember);
    }

    async function handleDeleteFaculty() {
        if (!currentFaculty) return;
        try {

            if (currentFaculty.imageUrl) {
                const storageRef = firebase.storage().refFromURL(currentFaculty.imageUrl);
                await storageRef.delete();
            }

            await firebase.firestore().collection('faculty').doc(currentFaculty.id).delete();
            setFaculty(prev => prev.filter(f => f.id !== currentFaculty.id));
            setShowDeleteConfirmationModal(false);
            toast.success('Docente excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir docente:', error);
            toast.error('Erro ao excluir docente.');
        }
    }

    if (loading) {
        return (
            <div className="dashboard-faculty">
                <AdminHeader />
                <div className='content'>
                    <Title name="Docentes">
                        <FaChalkboardTeacher size={25} />
                    </Title>
                    <div className='special-container dashboard-empty'>
                        <span>Buscando docentes...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-faculty">
            <AdminHeader />
            <div className="content">
                <Title name="Docentes">
                    <FaChalkboardTeacher size={25} />
                </Title>
                {faculty.length !== 0 ? (
                    <>
                        <Link to="/admin/cadastrar/docente" className="new-btn">
                            <FiPlus size={25} color="#FFF" />
                            Novo docente
                        </Link>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">NOME</th>
                                    <th scope="col">TÍTULO ACADÊMICO</th>
                                    <th scope="col">ÁREA DE PESQUISA</th>
                                    <th scope="col">CADASTRADO EM</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {faculty.map((facultyMember, index) => (
                                    <tr key={index}>
                                        <td data-label="Nome" className="td-title">{facultyMember.name}</td>
                                        <td data-label="Título Acadêmico">{facultyMember.academicTitle}</td>
                                        <td data-label="Área de Pesquisa">{facultyMember.researchArea}</td>
                                        <td data-label="Cadastrado em">{facultyMember.createdFormated}</td>
                                        <td data-label="#">
                                            <button className='action' style={{ backgroundColor: '#3583f6' }} onClick={() => toggleFacultyModal(facultyMember)}>
                                                <FiSearch color='#FFF' size={17} />
                                            </button>
                                            <Link className="action" style={{ backgroundColor: '#F6A935'}} to={`/admin/editar/docente/${facultyMember.id}`}>
                                                <FiEdit2 color="#FFF" size={17} />
                                            </Link>
                                            <button className="action" style={{ backgroundColor: '#B20600'}} onClick={() => toggleDeleteConfirmationModal(facultyMember)}>
                                                <FiTrash2 color="#fff" size={17} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {loadingMore && <p className="btn-more" style={{ textAlign: 'left', marginTop: 15, width: 'fit-content' }}>Buscando docentes...</p>}
                        {!loadingMore && !isEmpty && <button className='btn-more' style={{ textAlign: 'left' }} onClick={handleMore}>Buscar mais</button>}
                    </>
                ) : (
                    <div className="special-container dashboard-empty">
                        <span>Nenhum docente registrado</span>
                        <Link to="/admin/cadastrar/docente" className="new-btn">
                            <FiPlus size={25} color="#FFF" />
                            Novo docente
                        </Link>
                    </div>
                )}
            </div>
            {showFacultyModal && (
                <FacultyModal
                    show={showFacultyModal}
                    onHide={toggleFacultyModal}
                    faculty={currentFaculty}
                />
            )}
            {showDeleteConfirmationModal && (
                <FacultyDeleteModal
                    show={showDeleteConfirmationModal}
                    onClose={toggleDeleteConfirmationModal}
                    onConfirm={handleDeleteFaculty}
                />
            )}
        </div>
    );
};