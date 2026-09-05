import dotenv from "dotenv"
dotenv.config()

const config={
    PORT:process.env.PORT,
    Client_Route:process.env.Client_Route,
}

export default config