import { Router } from "express";
import * as authController from "../controllers/auth.controllers"
export  const authRouter=Router()

authRouter.post("/register",authController.register)


