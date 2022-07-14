import React, { useState, createContext, useEffect } from 'react';
import tickService from '../service/tick.service';
import Modals from '../component/modal/modal';
import Table from 'react-bootstrap/Table';
import './page.css';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencil,
  faPlus,
  faTrash,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { Form, FormControl } from 'react-bootstrap';
import imgEmpty from '../assets/images/vide.webp';

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

  const [search, setNewSearch] = useState('');

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  const [typeSearch, setTypeSearch] = useState('');

  const onChangeValue = (event) => {
    setTypeSearch(event.target.value);
  };

  const filtered = !search
    ? ticks
    : ticks.filter((tick) => {
        if (typeSearch === 'node') {
          return tick.node.toLowerCase().includes(search.toLowerCase());
        }
        if (typeSearch === 'equipe') {
          return tick.equipe.toLowerCase().includes(search.toLowerCase());
        }
        if (typeSearch === 'responsable') {
          return tick.responsable.toLowerCase().includes(search.toLowerCase());
        }
        if (typeSearch === 'test') {
          return tick.test.toLowerCase().includes(search.toLowerCase());
        }
      });

  const listTick = filtered.map((tick) => (
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

  const Affiche = () => {
    if (listTick.length === 0) {
      return (
        <div className='img-empty-content'>
          <img className='img-empty' src={imgEmpty} alt='' />
        </div>
      );
    } else {
      return (
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
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='tbl-content'>
        <div className='btn-add-content'>
          <h1>Listes</h1>
          <div className='search-content'>
            <strong>Filtrer par :</strong>
            <div onChange={onChangeValue} className='search-check'>
              <label>
                <input
                  className='check-fltr'
                  type='radio'
                  value='node'
                  name='search'
                />
                Node
              </label>
              <label>
                <input
                  className='check-fltr'
                  type='radio'
                  value='equipe'
                  name='search'
                />
                Equipe
              </label>
              <label>
                <input
                  className='check-fltr'
                  type='radio'
                  value='responsable'
                  name='search'
                />
                Responsable
              </label>
              <label>
                <input
                  className='check-fltr'
                  type='radio'
                  value='test'
                  name='search'
                />
                Test
              </label>
            </div>
            <Form className='d-flex form-search'>
              <FontAwesomeIcon
                className='search-icon'
                icon={faMagnifyingGlass}
              />
              <FormControl
                className='form-ctrl'
                type='text'
                value={search}
                onChange={handleSearchChange}
                disabled={!typeSearch}
              />
            </Form>
          </div>
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
        <Affiche />
      </div>
    </>
  );
}

export { ShowContext };
export default Tick;
