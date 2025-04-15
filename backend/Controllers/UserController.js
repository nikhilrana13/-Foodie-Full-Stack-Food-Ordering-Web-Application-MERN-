import User from "../models/UserModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const UserSignUp = async(req,res)=>{
      try {
          const {name,email,password} = req.body;
          // console.log("req.body",req.body)

        // check if user already exists
         const user = await User.findOne({email});

         if(user){
            return res.status(400).json({message:"User already exists"});
         }

         const hashpassword = await bcrypt.hash(password,10);

         const newUser = await User.create({
            name,
            email,
            password:hashpassword,
         })

         await newUser.save();
         return res.status(201).json({message:"Sign up successfully"});
      } catch (error) {
        console.log("error",error)
        return res.status(500).json({message:"Internal Server Error"});
      }
}

export const UserSignIn = async(req,res)=>{
      try {
        const {email,password} = req.body;
        
        // check if user exists or not 

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"User not found please sign up"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid password or email"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax"});

        return res.status(200).json({message:"Sign in successfully",user,token});
        
      } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
      }
}

export const UserSignOut = async(req,res)=>{
     try {
          res.clearCookie("token",{httpOnly:true,secure:false,sameSite:"lax"});
          return res.status(200).json({message:"Logout successfully"});
        
     } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
     }
}


