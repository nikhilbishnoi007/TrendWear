import { Router } from "express";
import * as authController from "../controllers/auth.controllers"
const authRouter=Router()

authRouter.post("/register",authController.register)
authRouter.post("/login",authController.login)
authRouter.get("/logout",authController.logout)

export default authRouter

