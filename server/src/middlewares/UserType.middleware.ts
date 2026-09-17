import { Request,Response,NextFunction } from "express";
import { userModel } from "../models/users.model";
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config/config";
import { Res } from "../controllers/auth.controllers";

export const isAdmin=async (req:Request,res:Response<Res>,next:NextFunction)=>{
    try {
    const refreshToken=req.cookies.refreshToken
    if(!refreshToken){
        return res.status(402).json({
            message:"User not loggedIn",
            success:false
        })
    }
    const decode=jwt.verify(refreshToken,config.REFRESH_TOKEN_SECRET)as JwtPayload
    if(!decode){
           return res.status(402).json({
            message:"Invalid Refresh Token",
            success:false
        })
    }
    const user=await userModel.findById(decode.id)
    if(!user){
        return res.status(404).json({
        message:"user not found",
        success:false
    })
    }
    if(user.role!=="admin"){
    return res.status(403).json({
        message:"User is not authorize to perform this task",
        success:false
    })
}
    next()
     } catch (error) {
       res.status(500).json({
        message:"Internal Server Error",
        success:false
       })
    }
}
