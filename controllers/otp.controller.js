import Otp from '../models/Otp.js'
import User from '../models/User.js'
import { trasporter } from '../utils/transporter.js';
import dotenv from 'dotenv'
dotenv.config()

export const sendOtp = async (req, res) => {
    const { email } = req.body;

    const isValid =await User.findOne({email})
    if (!isValid){
        return res.json({error:`${email} is Invalid username`})
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const saveOtp = new Otp({
        email, otp
    })
    await saveOtp.save();

    await trasporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "QuickShop OTP ",
        text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    })
    res.json( "OTP Sent Successfully")

}

export const verifyOtp=async(req,res)=>{
    const {email,otp}=req.body

    const available=await Otp.findOne({email,otp})

    if(!available){
        return res.json({error:'Invalid OTP Please Try Again !'})
    }

    await Otp.deleteMany({email})
    res.json({message:"OTP Verified"})
}