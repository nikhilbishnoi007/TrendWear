import { json, Request, Response } from 'express'
import { userModel } from '../models/users.model';
import { redis } from '../app';
import config from '../config/config';
import { Res } from './auth.controllers';


export const getUsers=async(req:Request,res:Response<Res>)=>{
    try {
    const data=await redis.get("users")
    if(data){
        return res.status(200).json({
        message:"Users Find",
        success:true,
        data:JSON.parse(data)
     })
    }
     const users=await userModel.find()
     if(users.length==0){
          return res.status(404).json({
            message:"no user exist",
            success:false
        })
     }
     await redis.set("users",JSON.stringify(users))
     res.status(200).json({
        message:"Users Find",
        success:true,
        data:users
     })
      } catch (error) {
        res.status(500).json({
         message:"Internal Serveer Error",
         success:false
        })
    }
}