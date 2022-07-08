
    import { userModel } from "../models/userModel.js";

// ******************************************************************
// *                          user Controller
// ******************************************************************

export default class userController {
  getAll = async (req, res) => {
    try {
      const userData = await userModel.find();
      res.json(userData);
    } catch (error) {
      res.send(error);
    }
  };
  create = async (req, res) => {
    try {
      const user = await userModel.create(req.body);
      res.json(user);
    } catch (error) {
      res.send(error);
    }
  };
  getAllBy = async (req, res) => {
    const { x, y } = req.body;
    try {
      const user = await userModel.findBy({
        x,
        y
      });
      res.status(200).json(user);
    } catch (error) {
      res.send(error);
    }
  };
  getOneById = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.send(error);
    }
  };
  update = async (req, res) => {
    try {
      const user = await userModel.findByIdAndUpdate(req.body, req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  remove = async (req, res) => {
    try {
      await userModel.findByIdAndRemove(req.params.id);
      res.status(200).json({ message: "Remove successfully !!!" });
    } catch (error) {
      res.status(500).send(error);
    }
  };
}
;

    