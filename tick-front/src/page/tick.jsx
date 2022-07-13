import React, { useState, createContext, useEffect } from 'react';
import tickService from '../service/tick.service';
import Modals from '../component/modal/modal';
import Table from 'react-bootstrap/Table';
import './page.css';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Form, FormControl, Button } from 'react-bootstrap';

const ShowContext = createContext();

function Tick() {
  const [show, setShow] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [dataDelete, setDataDelete] = useState(null);
  const [status, setstatus] = useState(null);

  const handleClose = () => {
    setDataEdit(null);
    setShow(false);
  };

  const addTick = () => {
    setShow(true);
    setstatus('add');
  };

  const editTick = (tick) => {
    setDataEdit(tick);
    setShow(true);
    setstatus('edit');
  };

  const deleteTick = (tick) => {
    setDataDelete(tick);
    setShow(true);
    setstatus('delete');
  };

  const initialValue = [];

  const [ticks, setTick] = useState(initialValue);

  useEffect(() => {
    tickService.getAllTick().then((res) => {
      setTick(res);
    });
  }, []);

  const listTick = ticks.map((tick) => (
    <tr key={tick._id}>
      <td className='tbody-td'>{tick.node}</td>
      <td className='tbody-td'>{tick.equipe}</td>
      <td className='tbody-td'>{tick.responsable}</td>
      <td className='tbody-td'>{tick.test}</td>
      <td className='action'>
        <button className='btn-delete' onClick={() => deleteTick(tick)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className='btn-edit' onClick={() => editTick(tick)}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <ToastContainer />
      <div className='tbl-content'>
        <div className='btn-add-content'>
          <h1>Listes</h1>
          <Form className='d-flex'>
            <FormControl
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
            <Button variant='outline-success'>Search</Button>
          </Form>
          <button className='btn-add' onClick={addTick}>
            <FontAwesomeIcon className='add-icon' icon={faPlus} />
            Ajouter
          </button>
        </div>
        <ShowContext.Provider
          value={{
            show,
            handleClose,
            dataEdit,
            dataDelete,
            status,
            setTick,
            ticks,
          }}
        >
          <Modals />
        </ShowContext.Provider>
        <Table striped bordered hover>
          <thead className='tb-thead'>
            <tr>
              <th>Node</th>
              <th>Equipe</th>
              <th>Responsable</th>
              <th>Test</th>
              <th className='action'>Action</th>
            </tr>
          </thead>
          <tbody className='tb-tbody'>{listTick}</tbody>
        </Table>
      </div>
    </>
  );
}

export { ShowContext };
export default Tick;
