import { Router } from "express";
import * as authController from "../controllers/auth.controllers"
import { RateLimiter } from "../middlewares/rateLimit.middleware";
const authRouter=Router()

authRouter.post("/register",authController.register)
authRouter.post("/login",RateLimiter,authController.login)
authRouter.get("/logout",authController.logout)

export default authRouter

