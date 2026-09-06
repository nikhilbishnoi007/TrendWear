import { Request,Response } from "express"
import userModel from "../models/users.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface ReqBody {
    username: string,
    email: string,
    password: string,
}
interface Res {
    message: string,
    success: boolean,
    data?: object
}

export const register=async (req:Request<{},{},ReqBody>,res:Response<Res>)=>{
    const {username,email,password}=req.body;
    const isAlreadyRegisterd=await userModel.findOne({$or:[{username},{email}]})
    if(isAlreadyRegisterd){
        return res.status(401).json({
            message:"user already exist",
            success:false
        })
    }
    const hashPassword=await bcrypt.hash(password,10)
    const newUser=userModel.create({
        username,
        email,
        password:hashPassword
    })

   res.status(201).json({
    message:"user registerd",
    success:true,
    data:newUser
   })
}