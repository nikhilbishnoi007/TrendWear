import { Router } from "express";
import * as adminController from "../controllers/admin.controllers"
import { isAdmin } from "../middlewares/UserType.middleware";
const adminRouter=Router()

adminRouter.get("/getusers",isAdmin,adminController.getUsers)


export default adminRouter

