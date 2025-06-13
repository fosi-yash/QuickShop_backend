import mongoose, { Schema } from 'mongoose'

const OtpSchema = new Schema({
    email: String,
    otp: String,
    createdAt: { type: Date, default: Date.now, expires: 300 }
})

const Otp=mongoose.model('Otp',OtpSchema)

export default Otp