import  express,{Request,Response} from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import config from "./config/config";
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
export default app