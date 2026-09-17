import { Response,Request,NextFunction } from "express";
import { redis } from "../app";
import { Res } from "../controllers/auth.controllers";

export const RateLimiter=async(req:Request,res:Response<Res>,next:NextFunction)=>{
        const ip=req.ip
        const key=`rate_limit:${ip}`
        const request=await redis.incr(key)
        if(request==1){
            await redis.expire(key,60)
        }
        if(request>5){
            return res.status(429).json({
                message:"To many request",
                success:false
            })
        }
        next()
}