import  express,{Request,Response} from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import config from "./config/config";
import authRouter  from "./routes/auth.routes";
import adminRouter from "./routes/admin.routes";
import Redis from "ioredis";



const app=express()
export const redis=new Redis(config.REDIS_URL)
redis.on("connect", () => console.log("Redis connected"));
redis.on("error", (err) => console.error("Redis error:", err));

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())
app.use(cors({
    origin:config.Client_Route,
    credentials:true
}))



app.get("/",(req:Request,res:Response)=>{
    res.send("server is runnig")
})
app.use("/api/auth",authRouter)
app.use("/api/admin",adminRouter)

export default app