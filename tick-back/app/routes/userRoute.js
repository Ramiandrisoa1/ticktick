import { Router } from "express";
    import  userController  from "../controllers/userController.js";
    const user = new userController();
        const userRoute = Router();
        userRoute.get("/", user.getAll);
        userRoute.get("/:id", user.getOneById);
        userRoute.post("/new", user.create);
        userRoute.post("/:id", user.update);
        userRoute.delete("/:id", user.remove);
    
    export default userRoute;