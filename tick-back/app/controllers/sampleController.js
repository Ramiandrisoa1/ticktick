
    import { sampleModel } from "../models/sampleModel.js";

// ******************************************************************
// *                          sample Controller
// ******************************************************************

export default class sampleController {
  getAll = async (req, res) => {
    try {
      const sampleData = await sampleModel.find();
      res.json(sampleData);
    } catch (error) {
      res.send(error);
    }
  };
  create = async (req, res) => {
    try {
      const sample = await sampleModel.create(req.body);
      res.json(sample);
    } catch (error) {
      res.send(error);
    }
  };
  getAllBy = async (req, res) => {
    const { x, y } = req.body;
    try {
      const sample = await sampleModel.findBy({
        x,
        y
      });
      res.status(200).json(sample);
    } catch (error) {
      res.send(error);
    }
  };
  getOneById = async (req, res) => {
    try {
      const sample = await sampleModel.findById(req.params.id);
      res.status(200).json(sample);
    } catch (error) {
      res.send(error);
    }
  };
  update = async (req, res) => {
    try {
      const sample = await sampleModel.findByIdAndUpdate(req.body, req.params.id);
      res.status(200).json(sample);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  remove = async (req, res) => {
    try {
      await sampleModel.findByIdAndRemove(req.params.id);
      res.status(200).json({ message: "Remove successfully !!!" });
    } catch (error) {
      res.status(500).send(error);
    }
  };
}
;

    