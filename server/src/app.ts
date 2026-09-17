import  express,{Request,Response} from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import config from "./config/config";
import authRouter  from "./routes/auth.routes";
import adminRouter from "./routes/admin.routes";



 const app=express()


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
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