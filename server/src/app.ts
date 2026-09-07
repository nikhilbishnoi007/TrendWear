import  express,{Request,Response} from "express";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import { Strategy } from "passport-google-oauth20";
import cors from 'cors'
import config from "./config/config";
import { authRouter } from "./routes/auth.routes";


const app=express()

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:config.Client_Route,
    credentials:true
}))
app.use(session({
    secret:config.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())


app.get("/",(req:Request,res:Response)=>{
    res.send("server is runnig")
})
app.use("/api/auth",authRouter)
export default app