const axios = require('axios');

async function getUser(req, res) {
  const { data } = await axios.get(
    'https://alfred.telma.net/utilities_cache/users_with_alfred_account'
  );
  const response = data.users_by_matricule;
  return res.status(201).json({
    message: 'succès',
    response,
  });
}

module.exports = {
  getUser,
};
