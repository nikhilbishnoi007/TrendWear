import app from "./app";
import config from "./config/config";
import { connectDb } from "./config/db";


const port=config.PORT

connectDb().then(()=>{
app.listen(port,()=>{
    console.log(`server is listening at port:${port}`)
})
}).catch((error)=>{
    console.log(error)
})
