import React from 'react';
import './modal.css'

const Modal = ({ isOpen, onClose, children }) => {

    if (!isOpen) {
        return null;
    }

    const closeModal = () => {
        onClose();
    };

    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleOutsideClick}>
            <div className="modal-container">
                {children}
            </div>
        </div>
    );
};

export default Modal



