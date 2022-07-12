import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import tickService from '../../service/tick.service';
import { ShowContext } from '../../page/tick';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './form.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AsyncSelect from 'react-select/async';

function FormAddEdit() {
  const validationSchema = Yup.object().shape({
    node: Yup.string()
      .required('Ce champ est obligatoire')
      .min(3, 'Trop court !')
      .max(25, 'Trop long!'),
    equipe: Yup.string()
      .required('Ce champ est obligatoire')
      .min(3, 'Trop court !')
      .max(25, 'Trop long!'),
    responsable: Yup.string().required('Ce champ est obligatoire'),
    test: Yup.string()
      .required('Ce champ est obligatoire')
      .min(3, 'Trop courte !')
      .max(25, 'Trop long !'),
  });

  const { register, formState, handleSubmit, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;

  const value = useContext(ShowContext);
  const initialState = {
    node: value.dataEdit ? value.dataEdit.node : '',
    equipe: value.dataEdit ? value.dataEdit.equipe : '',
    responsable: value.dataEdit ? value.dataEdit.responsable : '',
    test: value.dataEdit ? value.dataEdit.test : '',
  };

  const [tick, setTick] = useState(initialState);

  const loadOptions = async (inputText, callback) => {
    const response = await fetch(
      `http://localhost:8080/api/list-tick?node=${inputText}`
    );
    const json = await response.json();
    callback(json.map((i) => ({ label: i.node, value: i._id })));
  };

  const handleChange = ({ target: { value, name } }) => {
    setTick({ ...tick, [name]: value });
  };

  const onChange = (value) => {
    setTick({ ...tick, responsable: value.label });
  };

  function handleSubmitAddEdit(event) {
    if (!value.dataEdit) {
      tickService.addTick(tick).then(
        (res) => {
          console.log(res);
          const addData = {
            _id: res.data.tick._id,
            node: res.data.tick.node,
            equipe: res.data.tick.equipe,
            responsable: res.data.tick.responsable,
            test: res.data.tick.test,
          };
          value.setTick([...value.ticks, addData]);
          toast.success('ajout avec succès', { autoClose: 1000 });
          value.handleClose();
          reset();
        },
        (err) => {
          console.log(err);
          toast.error('erreur', { autoClose: 1000 });
        }
      );
    } else {
      tickService.editTick(value.dataEdit._id, tick).then(
        (res) => {
          console.log(res);
          const editData = {
            _id: value.dataEdit._id,
            node: tick.node,
            equipe: tick.equipe,
            responsable: tick.responsable,
            test: tick.test,
          };
          value.setTick(
            value.ticks.map((ticks) => {
              return ticks._id === value.dataEdit._id ? editData : ticks;
            })
          );
          toast.success('Modification avec succès', { autoClose: 1000 });
          value.handleClose();
          reset();
        },
        (err) => {
          console.log(err);
          toast.error('erreur', { autoClose: 1000 });
        }
      );
    }
  }
  return (
    <>
      <Form id='form-add-edit' onSubmit={handleSubmit(handleSubmitAddEdit)}>
        <Form.Group className='form-groupp mb-3' controlId='formBasicNode'>
          <Form.Label>Node</Form.Label>
          <Form.Control
            className='form-ctrl'
            type='text'
            placeholder='Entrer Node'
            name='node'
            value={tick.node}
            {...register('node')}
            onChange={handleChange}
          />
          <small className='text-danger'>{errors.node?.message}</small>
        </Form.Group>
        <Form.Group className='form-groupp mb-3' controlId='formBasicEquipe'>
          <Form.Label>Equipe</Form.Label>
          <Form.Control
            className='form-ctrl'
            type='text'
            placeholder='Entrer Equipe'
            name='equipe'
            value={tick.equipe}
            {...register('equipe')}
            onChange={handleChange}
          />
          <small className='text-danger'>{errors.equipe?.message}</small>
        </Form.Group>
        <Form.Group
          className='form-groupp mb-3'
          controlId='formBasicResponsable'
        >
          <Form.Label>Responsable</Form.Label>
          {/* <Form.Control
            className='form-ctrl'
            type='text'
            placeholder='Entrer Responsable'
            name='responsable'
            value={tick.responsable}
            {...register('responsable')}
            onChange={handleChange}
          /> */}
          <AsyncSelect
            value={tick.responsable.label}
            onChange={onChange}
            loadOptions={loadOptions}
            {...register('responsable')}
          />
          <small className='text-danger'>{errors.responsable?.message}</small>
        </Form.Group>
        <Form.Group className='form-groupp mb-3' controlId='formBasicTest'>
          <Form.Label>Test</Form.Label>
          <Form.Control
            className='form-ctrl'
            type='text'
            placeholder='Entrer Test'
            name='test'
            value={tick.test}
            {...register('test')}
            onChange={handleChange}
          />
          <small className='text-danger'>{errors.test?.message}</small>
        </Form.Group>
      </Form>
    </>
  );
}

export default FormAddEdit;
