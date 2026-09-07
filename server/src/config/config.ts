import dotenv from "dotenv"
dotenv.config()


if (!process.env.DB_URL) {
    throw new Error("connection string not defined")
}
if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("provide access token secret")
}
if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("provide refresh token secret")
}
if (!process.env.SESSION_SECRET) {
    throw new Error("provide session secret")
}
if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("provide google client id")
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("provide google client secret")
}
if (!process.env.GOOGLE_CALLBACK_URL) {
    throw new Error("provide google callbacke url")
}
const config = {
    PORT: process.env.PORT,
    Client_Route: process.env.Client_Route,
    DB_URL: process.env.DB_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    SESSION_SECRET: process.env.SESSION_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL
}

export default config