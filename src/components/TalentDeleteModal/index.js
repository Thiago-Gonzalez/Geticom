import React from 'react';
import './talentdeletemodal.css';

export default function TalentDeleteModal({ show, onClose, onConfirm }) {
    if (!show) return null;
    return (
        <div className="talent-delete-modal-overlay">
            <div className="talent-delete-modal-container">
                <h2>Deseja excluir esse talento?</h2>
                <div className="talent-delete-modal-actions">
                    <button className="btn-confirm" onClick={onConfirm}>Excluir</button>
                    <button className="btn-cancel" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
} 