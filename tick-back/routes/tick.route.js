const express = require('express');
const {
  addTick,
  getTick,
  deleteTick,
  updateTick,
} = require('../controllers/tick.controller');

const router = express.Router();

router.post('/add-tick', addTick);
router.get('/list-tick', getTick);
router.delete('/delete/:id', deleteTick);
router.post('/edit/:id', updateTick);

module.exports = { routes: router };
