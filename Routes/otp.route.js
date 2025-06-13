import express from 'express'
import { Router } from 'express'
import fetchuser from '../middleware/fetchuser.js'
import { sendOtp, verifyOtp } from '../controllers/otp.controller.js'
const otprouter=express.Router()

otprouter.post('/sent-otp',sendOtp)
otprouter.post('/verify-otp',verifyOtp)

export default otprouter;