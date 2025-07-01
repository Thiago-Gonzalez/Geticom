import './faculty.css';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SectionTitle from '../../components/SectionTitle';
import { FaLinkedin, FaSearch, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import FacultyModal from '../../components/FacultyModal';
import firebase from '../../services/firebaseConnection';

export default function Faculty() {
    const [showModal, setShowModal] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [facultyData, setFacultyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFacultyData();
    }, []);

    async function loadFacultyData() {
        try {
            const snapshot = await firebase.firestore()
                .collection('faculty')
                .orderBy('created', 'desc')
                .get();

            const facultyList = [];
            snapshot.forEach((doc) => {
                facultyList.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            setFacultyData(facultyList);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao carregar docentes:', error);
            setLoading(false);
        }
    }

    const handleShowModal = (faculty) => {
        setSelectedFaculty(faculty);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedFaculty(null);
    };

    if (loading) {
        return (
            <Container fluid>
                <Header />
                <div className="faculty">
                    <SectionTitle>Corpo Docente</SectionTitle>
                    <p className="subtitle">
                        Conheça nossos professores e pesquisadores dedicados ao ensino e à inovação tecnológica.
                    </p>
                    <div className="faculty-cards">
                        <div className="loading-message">Carregando docentes...</div>
                    </div>
                </div>
                <Footer />
            </Container>
        );
    }

    return (
        <Container fluid>
            <Header />

            <div className="faculty">
                <SectionTitle>Corpo Docente</SectionTitle>
                <p className="subtitle">
                    Conheça nossos professores e pesquisadores dedicados ao ensino e à inovação tecnológica.
                </p>
                <div className="faculty-cards">
                    {facultyData.length > 0 ? (
                        facultyData.map((faculty) => (
                            <div className="faculty-card" key={faculty.id}>
                                <FaSearch color="" className="see-more-icon" onClick={() => handleShowModal(faculty)} title="Ver detalhes" />
                                {faculty.imageUrl ? (
                                    <img className="avatar" src={faculty.imageUrl} alt={faculty.name} />
                                ) : (
                                    <div className="avatar" />
                                )}
                                <h2>{faculty.name}</h2>
                                <div className="academic-title">
                                    <div className="title">{faculty.academicTitle}</div>
                                </div>
                                <div className="research-area">
                                    <span className="area-label">Área de Pesquisa:</span> {faculty.researchArea}
                                </div>
                                <div className="disciplines-preview">
                                    <span className="disciplines-label">Disciplinas Ministradas:</span>
                                    <div className="disciplines-list">
                                        {faculty.disciplines && faculty.disciplines.split(',').slice(0, 3).map((discipline, index) => (
                                            <div className="discipline-item" key={index}>
                                                • {discipline.trim()}
                                            </div>
                                        ))}
                                        {faculty.disciplines && faculty.disciplines.split(',').length > 3 && (
                                            <div className="discipline-item more">
                                                ... e mais {faculty.disciplines.split(',').length - 3} disciplina(s)
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="card-links">
                                    {faculty.linkedin && (
                                        <a href={faculty.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin size={20} /></a>
                                    )}
                                    {faculty.lattes && (
                                        <a href={faculty.lattes} target="_blank" rel="noopener noreferrer" title="Lattes"><FaFileAlt size={20} /></a>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-faculty-message">
                            <p>Nenhum docente cadastrado ainda.</p>
                        </div>
                    )}
                </div>
            </div>

            <FacultyModal
                show={showModal}
                onHide={handleCloseModal}
                faculty={selectedFaculty}
            />

            <Footer />
        </Container>
    );
} 