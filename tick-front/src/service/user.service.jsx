import api from '../component/api/api';

const getAllUser = async () => {
  const response = await api.get('/alfred/list-user');
  return response.data;
};

const usersService = {
  getAllUser,
};

export default usersService;
