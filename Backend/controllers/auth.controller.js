import { app } from "../config/firebase.js"
import {getAuth} from "firebase-admin/auth"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
export const login = async (req,res)=>{
    try{
        const {token:firebaseToken} = req.body
        if(!firebaseToken){
            return res.status(400).json({message:"Firebase token is required"})
        }

        const decoded = await getAuth(app).verifyIdToken(firebaseToken)

        const user = await User.findOneandUpdate(
            {firebaseUid:decoded.uid},
            {
                $set:{
                    name:decoded.name,
                    email:decoded.email,
                    profilePicture:decoded.picture
                },
                $setOnInsert:{
                    firebaseUid:decoded.uid
                }
            },
            {upsert:true,
              returnDocument:"after"
            }
        )

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000 
        })

        return res.status(200).json(user)
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
} 