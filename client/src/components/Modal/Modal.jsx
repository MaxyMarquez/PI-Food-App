import React from 'react';
import { Link } from 'react-router-dom';
import './modal.css'

const Modal = ({ isOpen, onClose, }) => {

    if (!isOpen) {
        return null;
    }

    // const closeModal = () => {
    //     onClose();
    // };
    // 
    // const handleOutsideClick = (event) => {
    //     if (event.target === event.currentTarget) {
    //         closeModal();
    //     }
    // };
    // onClick={handleOutsideClick}
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} >
            <div className="modal-container">
                <span className='checkmark'></span>
                <h2 className='modal__title'>WELL DONE RECIPE CREATE!!</h2>
                <Link className='modal__button' to='/home'>Done</Link>
            </div>
        </div>
    );
};

export default Modal



