import React from 'react';
import { Modal } from 'react-bootstrap';
import { FaLinkedin, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './talentmodal.css';

export default function TalentModal({ show, onHide, talent }) {
    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Detalhes do Talento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {talent && (
                    <div className="student-modal-details-row">
                        {talent.imageUrl && (
                            <img className="avatar-modal" src={talent.imageUrl} alt={talent.name} />
                        )}
                        <div className="student-modal-info">
                            <div className="modal-field">
                                <span className="modal-label">Nome:</span>
                                <span>{talent.name}</span>
                            </div>
                            <div className="modal-field">
                                <span className="modal-label">Curso:</span>
                                <span>{talent.course} {talent.semester ? `- ${talent.semester}º semestre` : ''}</span>
                            </div>
                            <div className="modal-field">
                                <span className="modal-label">Email:</span>
                                <span>{talent.email}</span>
                            </div>
                            <div className="modal-field">
                                <span className="modal-label">Telefone:</span>
                                <span>{talent.phone}</span>
                            </div>
                            <div className="modal-field skills-field">
                                <span className="modal-label">Skills:</span>
                                <div className="skills-modal">
                                    {talent.skills && talent.skills.split(',').map((skill) => (
                                        <span className="skill" key={skill.trim()}>{skill.trim()}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-field disponibilidade-field">
                                <span className="modal-label">Disponibilidade:</span>
                                <span>{talent.availability === 'full-time' ? 'Tempo Integral' : talent.availability === 'part-time' ? 'Meio Período' : 'Freelance'}</span>
                            </div>
                            {talent.experience && (
                                <div className="modal-field experiencia-field">
                                    <span className="modal-label">Experiência Profissional:</span>
                                    <span>{talent.experience}</span>
                                </div>
                            )}
                            {talent.notes && (
                                <div className="modal-field observacao-field">
                                    <span className="modal-label">Observações:</span>
                                    <span>{talent.notes}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {talent && (
                    <div className="modal-links">
                        {talent.linkedin && (
                            <a href={talent.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin size={22} /></a>
                        )}
                        {talent.github && (
                            <a href={talent.github} target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub size={22} /></a>
                        )}
                        {talent.portfolio && (
                            <a href={talent.portfolio} target="_blank" rel="noopener noreferrer" title="Portfólio"><FaExternalLinkAlt size={20} /></a>
                        )}
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
} 