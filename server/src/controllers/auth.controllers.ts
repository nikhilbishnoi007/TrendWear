import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from '../models/users.model'
import config from '../config/config'


interface ReqBody {
    username: string,
    email: string,
    password: string,
}
interface Res {
    message: string,
    success: boolean,
    data?: object;
    accessToken?: string
}


export const register = async (req: Request<{}, {}, ReqBody>, res: Response<Res>) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        let isAlreadyRegister = await userModel.findOne({
            $or: [
                { email },
                { username }
            ]
        })
        if (isAlreadyRegister) {
            return res.status(401).json({
                message: "User or email already register",
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const newuser = await userModel.create({
            username,
            email,
            password: hash,
        })
        const refreshToken = jwt.sign({ id: newuser._id }, config.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
        const accessToken = jwt.sign({ email: newuser.email, id: newuser._id }, config.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
        newuser.refreshToken = refreshToken
        await newuser.save()
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        const sentuser = await userModel.findById(newuser._id).select("-password -refreshToken")
        if (!sentuser) {
            return res.status(404).json({
                message: "User not found after creation",
                success: false
            });
        }

        res.status(201).json({
            message: "User Registered  Successfully",
            success: true,
            data: sentuser,
            accessToken
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }

}

export const login = async (req: Request<{}, {}, ReqBody>, res: Response<Res>) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(401).json({
                message: "email or password wrong",
                success: false,
            })
        }
        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            return res.status(401).json({
                message: "email or passsword is wrong",
                success: false
            })
        }
        const refreshToken = jwt.sign({ id: user._id }, config.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
        const accessToken = jwt.sign({ email: user.email, id: user._id }, config.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        const sentuser =await  userModel.findById(user._id).select("-password -refreshToken")
        if (!sentuser) {
            return res.status(404).json({
                message: "User not found after creation",
                success: false
            });
        }
        res.status(200).json({
            message: "Login Suceesffully",
            success: true,
            data: sentuser,
            accessToken
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }

}

export const logout = async (req: Request, res: Response<Res>) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })
        res.status(200).json({
            message: "logout successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Somthing Went Wrong",
            success: false
        })
    }
}

