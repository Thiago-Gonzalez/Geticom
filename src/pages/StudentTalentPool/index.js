import './studenttalentpool.css';
import { useEffect, useState } from 'react';
import firebase from '../../services/firebaseConnection';
import { Container, Modal, Button } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SectionTitle from '../../components/SectionTitle';
import { FaLinkedin, FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import TalentModal from '../../components/TalentModal';

export default function StudentTalentPool() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        async function loadTalents() {
            await firebase.firestore().collection('talents').orderBy('created', 'desc').get()
                .then((snapshot) => {
                    let list = [];
                    snapshot.forEach(doc => {
                        list.push({ id: doc.id, ...doc.data() });
                    });
                    setStudents(list);
                    setLoading(false);
                });
        }
        loadTalents();
    }, []);

    const handleShowModal = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedStudent(null);
    };

    return (
        <Container fluid>
            <Header />

            <div className="student-talent-pool">
                <SectionTitle>Banco de Talentos</SectionTitle>
                <p className="subtitle">
                    Descubra estudantes talentosos da Universidade Estadual do Maranhão para recrutar para sua empresa.
                </p>
                <div className="student-cards">
                    {loading ? (
                        <p>Carregando talentos...</p>
                    ) : students.length === 0 ? (
                        <p>Nenhum talento cadastrado ainda.</p>
                    ) : students.map((student) => (
                        <div className="student-card" key={student.id}>
                            <FaSearch color="" className="see-more-icon" onClick={() => handleShowModal(student)} title="Ver detalhes" />
                            {student.imageUrl ? (
                                <img className="avatar" src={student.imageUrl} alt={student.name} />
                            ) : (
                                <div className="avatar" />
                            )}
                            <h2>{student.name}</h2>
                            <div className="course-semester">
                                <div className="course">{student.course}</div>
                                {student.semester && (
                                    <div className="semester">{student.semester}º semestre</div>
                                )}
                            </div>
                            <div className="skills">
                                {student.skills && student.skills.split(',').slice(0, 4).map((skill) => (
                                    <span className="skill" key={skill.trim()}>{skill.trim()}</span>
                                ))}
                            </div>
                            <div className="availability">
                                <span className="availability-label">Disponibilidade:</span> {student.availability === 'full-time' ? 'Tempo Integral' : student.availability === 'part-time' ? 'Meio Período' : 'Freelance'}
                            </div>
                            <div className="card-links">
                                {student.linkedin && (
                                    <a href={student.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin size={20} /></a>
                                )}
                                {student.github && (
                                    <a href={student.github} target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub size={20} /></a>
                                )}
                                {student.portfolio && (
                                    <a href={student.portfolio} target="_blank" rel="noopener noreferrer" title="Portfólio"><FaExternalLinkAlt size={18} /></a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <TalentModal
                show={showModal}
                onHide={handleCloseModal}
                talent={selectedStudent}
            />

            <Footer />
        </Container>
    );
}