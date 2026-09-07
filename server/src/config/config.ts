import dotenv from "dotenv"
dotenv.config()


if(!process.env.DB_URL){
    throw new Error("connection string not defined")
}
if(!process.env.ACCESS_TOKEN_SECRET){
    throw new Error("provide access token secret")
}
if(!process.env.REFRESH_TOKEN_SECRET){
    throw new Error("provide refresh token secret")
}
const config={
    PORT:process.env.PORT,
    Client_Route:process.env.Client_Route,
    DB_URL:process.env.DB_URL,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET
}

export default config