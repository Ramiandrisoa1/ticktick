import React, { useContext, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import tickService from '../../service/tick.service';
import { ShowContext } from '../../page/tick';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './form.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

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
    responsable: Yup.string().required('Veuillez choisir une resp'),
    test: Yup.string()
      .required('Ce champ est obligatoire')
      .min(3, 'Trop courte !')
      .max(25, 'Trop long !'),
  });

  const value = useContext(ShowContext);

  const { register, formState, handleSubmit, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      responsable: value.dataEdit ? value.dataEdit.responsable : '',
    },
  });

  const { errors } = formState;

  const initialState = {
    node: value.dataEdit ? value.dataEdit.node : '',
    equipe: value.dataEdit ? value.dataEdit.equipe : '',
    responsable: value.dataEdit ? value.dataEdit.responsable : '',
    test: value.dataEdit ? value.dataEdit.test : '',
  };

  const [selectRsbl, setSelectRsbl] = useState([]);

  useEffect(() => {
    tickService.getAllTick().then((res) => {
      setSelectRsbl(res);
    });
  }, []);

  const [tick, setTick] = useState(initialState);

  const handleChange = ({ target: { value, name } }) => {
    setTick({ ...tick, [name]: value });
    console.log(name, value);
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
          <select
            className='custom-select d-block w-100'
            type='text'
            name='responsable'
            value={tick.responsable}
            {...register('responsable')}
            onChange={handleChange}
          >
            <option value='' hidden>
              --Choisir--
            </option>
            {selectRsbl.map((option) => (
              <React.Fragment key={option._id}>
                <option value={option.node}>{option.node}</option>
              </React.Fragment>
            ))}
          </select>
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
