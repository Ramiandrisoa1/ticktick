import { Router } from "express";
    import  sampleController  from "../controllers/sampleController.js";
    const sample = new sampleController();
        const sampleRoute = Router();
        sampleRoute.get("/", sample.getAll);
        sampleRoute.get("/:id", sample.getOneById);
        sampleRoute.post("/new", sample.create);
        sampleRoute.post("/:id", sample.update);
        sampleRoute.delete("/:id", sample.remove);
    
    export default sampleRoute;