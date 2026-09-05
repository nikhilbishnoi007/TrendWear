import app from "./app";
import config from "./config/config";


const port=config.PORT

app.listen(port,()=>{
    console.log(`server is listening at port:${port}`)
})