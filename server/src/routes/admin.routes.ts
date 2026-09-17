import { Router } from "express";
import * as adminController from "../controllers/admin.controllers"
import { isAdmin } from "../middlewares/UserType.middleware";
import { RateLimiter } from "../middlewares/rateLimit.middleware";
const adminRouter=Router()

adminRouter.get("/getusers",RateLimiter,adminController.getUsers)


export default adminRouter

