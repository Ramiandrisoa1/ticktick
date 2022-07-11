import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { ShowContext } from '../../page/tick';
// import FormAddEdit from '../form/form';
import tickService from '../../service/tick.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './modal.css';

function Modals() {
  const value = useContext(ShowContext);

  const deleteTick = () => {
    value.setTick(
      value.ticks.filter((tick) => tick._id !== value.dataDelete._id)
    );
    tickService.deleteTick(value.dataDelete._id).then(
      (res) => {
        console.log(res);
        toast.success(
          `La suppression de ${value.dataDelete.node} est réussie`,
          {
            autoClose: 1000,
          }
        );
        value.handleClose();
      },
      (err) => {
        console.log(err);
        toast.success(
          `La suppression de ${value.dataDelete.node} est réussie`,
          {
            autoClose: 1000,
          }
        );
      }
    );
  };

  return (
    <>
      <Modal show={value.show} onHide={value.handleClose}>
        {(() => {
          switch (value.status) {
            case 'delete':
              return (
                <>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Voulez‑vous vraiment supprimer cet ... ?
                  </Modal.Body>
                  <Modal.Footer>
                    <button className='btn-cancel' onClick={value.handleClose}>
                      Close
                    </button>
                    <button className='btn-submit' onClick={deleteTick}>
                      Confirmer
                    </button>
                  </Modal.Footer>
                </>
              );
            case 'edit':
              return (
                <>
                  <Modal.Header closeButton>
                    <Modal.Title>Modification</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{/* <FormAddEdit /> */}</Modal.Body>
                  <Modal.Footer>
                    <button className='btn-cancel' onClick={value.handleClose}>
                      Close
                    </button>
                    <button
                      form='form-add-edit'
                      type='submit'
                      className='btn-submit'
                    >
                      Modifier
                    </button>
                  </Modal.Footer>
                </>
              );
            case 'add':
              return (
                <>
                  <Modal.Header closeButton>
                    <Modal.Title>Ajout</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{/* <FormAddEdit /> */}</Modal.Body>
                  <Modal.Footer>
                    <button className='btn-cancel' onClick={value.handleClose}>
                      Close
                    </button>
                    <button
                      form='form-add-edit'
                      type='submit'
                      className='btn-submit'
                    >
                      Ajouter
                    </button>
                  </Modal.Footer>
                </>
              );
            default:
              return null;
          }
        })()}
      </Modal>
    </>
  );
}

export default Modals;
