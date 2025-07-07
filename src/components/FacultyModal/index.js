import React from 'react';
import { Modal } from 'react-bootstrap';
import { FaLinkedin, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import './facultymodal.css';

export default function FacultyModal({ show, onHide, faculty }) {
    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Detalhes do Docente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {faculty && (
                    <div className="faculty-modal-details-row">
                        {faculty.imageUrl && (
                            <img className="avatar-modal" src={faculty.imageUrl} alt={faculty.name} />
                        )}
                        <div className="faculty-modal-info">
                            <div className="modal-field">
                                <span className="modal-label">Nome:</span>
                                <span>{faculty.name}</span>
                            </div>
                            <div className="modal-field">
                                <span className="modal-label">Título Acadêmico:</span>
                                <span>{faculty.academicTitle}</span>
                            </div>
                            <div className="modal-field">
                                <span className="modal-label">Email:</span>
                                <span>{faculty.email}</span>
                            </div>
                            <div className="modal-field">
                                <span className="modal-label">Telefone:</span>
                                <span>{faculty.phone}</span>
                            </div>
                            <div className="modal-field">
                                <span className="modal-label">Área de Pesquisa:</span>
                                <span>{faculty.researchArea}</span>
                            </div>
                            <div className="modal-field disciplines-field">
                                <span className="modal-label">Disciplinas Ministradas:</span>
                                <div className="disciplines-modal">
                                    {faculty.disciplines && faculty.disciplines.split(',').map((discipline) => (
                                        <div className="discipline-item" key={discipline.trim()}>
                                            • {discipline.trim()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {faculty.biography && (
                                <div className="modal-field">
                                    <span className="modal-label">Biografia:</span>
                                    <span className="biography-text">{faculty.biography}</span>
                                </div>
                            )}
                            {faculty.academicFormation && (
                                <div className="modal-field">
                                    <span className="modal-label">Formação Acadêmica:</span>
                                    <div className="academic-formation-modal">
                                        {faculty.academicFormation.split(/\n|,|;/).map((formation, idx) => (
                                            <div className="formation-item" key={idx}>
                                                • {formation.trim()}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {faculty.publishedWorks && faculty.publishedWorks.length > 0 && (
                                <div className="modal-field published-works-field">
                                    <span className="modal-label">Trabalhos Publicados:</span>
                                    <div className="published-works-list">
                                        {faculty.publishedWorks.map((work, index) => (
                                            <div className="published-work-item" key={index}>
                                                <FaExternalLinkAlt size={14} color="#16163F" />
                                                <a 
                                                    href={work.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="published-work-link"
                                                >
                                                    {work.title}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {faculty && (
                    <div className="modal-links">
                        {faculty.linkedin && (
                            <a href={faculty.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin size={22} /></a>
                        )}
                        {faculty.lattes && (
                            <a href={faculty.lattes} target="_blank" rel="noopener noreferrer" title="Lattes"><FaFileAlt size={22} /></a>
                        )}
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
} 