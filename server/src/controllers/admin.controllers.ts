import { Request, Response } from 'express'
import { userModel } from '../models/users.model';

interface Res {
    message: string,
    success: boolean,
    data?: object;
}

export const getUsers=async(req:Request,res:Response<Res>)=>{
    try {
     const allUsers=await userModel.find()
     if(allUsers.length==0){
          return res.status(404).json({
            message:"no user exist",
            success:false
        })
     }
     res.status(200).json({
        message:"Users Find",
        success:true,
        data:allUsers
     })
      } catch (error) {
        res.status(500).json({
         message:"Internal Serveer Error",
         success:false
        })
    }
}