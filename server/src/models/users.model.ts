import mongoose ,{Schema,Document} from "mongoose";

interface User extends Document{
 username:string,
 email:string,
 password:string,
 refreshToken?:string
}

const userSchema=new Schema<User>({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    }
},{
    timestamps:true
})

const userModel=mongoose.model<User>("users",userSchema)

export default userModel