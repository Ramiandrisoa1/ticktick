const express = require('express');
const { getUser } = require('../controllers/user.controller');

const router = express.Router();

router.get('/list-user', getUser);

module.exports = { routes: router };
