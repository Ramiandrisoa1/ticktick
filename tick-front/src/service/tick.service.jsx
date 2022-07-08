import api from '../component/api/api';

const getAllTick = async () => {
  const response = await api.get('/list-tick');
  return response.data;
};

const deleteTick = async (id) => {
  const response = await api.delete(`/delete/${id}`);
  return response;
};

const addTick = async (payload) => {
  const response = await api.post(`/add-tick`, payload);
  return response;
};

const editTick = async (id, payload) => {
  const response = await api.post(`/edit/${id}`, payload);
  return response;
};

const tickService = {
  getAllTick,
  deleteTick,
  addTick,
  editTick,
};

export default tickService;
