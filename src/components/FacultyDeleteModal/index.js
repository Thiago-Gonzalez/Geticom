import React from 'react';
import './facultydeletemodal.css';

export default function FacultyDeleteModal({ show, onClose, onConfirm }) {
    if (!show) return null;
    return (
        <div className="faculty-delete-modal-overlay">
            <div className="faculty-delete-modal-container">
                <h2>Deseja excluir esse docente?</h2>
                <div className="faculty-delete-modal-actions">
                    <button className="btn-confirm" onClick={onConfirm}>Excluir</button>
                    <button className="btn-cancel" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
} 