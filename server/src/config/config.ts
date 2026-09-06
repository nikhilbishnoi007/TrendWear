import dotenv from "dotenv"
dotenv.config()


if(!process.env.DB_URL){
    throw new Error("connection string not defined")
}
const config={
    PORT:process.env.PORT,
    Client_Route:process.env.Client_Route,
    DB_URL:process.env.DB_URL
}

export default config