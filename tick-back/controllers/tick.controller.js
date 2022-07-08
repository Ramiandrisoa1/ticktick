const Tick = require('../models/tick');

const addTick = async (req, res) => {
  try {
    const tick = new Tick(req.body);
    tick.save();
    return res.status(201).json({
      message: 'succès',
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getTick = async (req, res) => {
  const tick = await Tick.find();
  Tick.find()
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: 'user null',
        });
      } else {
        return res.status(201).json(tick);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error',
      });
    });
};

const deleteTick = async (req, res) => {
  const id = req.params.id;
  Tick.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: ` id=${id} ne peut pas etre supprimer`,
        });
      } else {
        res.send({
          message: 'suppression tick avec succes!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error',
      });
    });
};

const updateTick = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Les données à modifiers ne peuvent pas etre vide',
    });
  }
  const id = req.params.id;
  Tick.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update tick with id=${id}. Maybe tick was not found!`,
        });
      } else
        res.send({
          message: `tick with id=${id} update avec succes.`,
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Erreur updating tick with id=' + id,
      });
    });
};

module.exports = {
  addTick,
  getTick,
  deleteTick,
  updateTick,
};
