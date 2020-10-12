import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../styles/modal.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const SalidaModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const handleModalClose = () => {
    // console.log(modalIsOpen);
    setModalIsOpen(!modalIsOpen);
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo">
        <form>
          <h6>Orden Salida</h6>
          <hr />
        </form>
      </Modal>
    </div>
  );
};
