import React from 'react';
import './errorModal.css';

const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Error</h2>
              <span className="modal-close" onClick={onClose}>&times;</span>
            </div>
            <div className="modal-body">
              <p>{errorMessage}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorModal;
