import express from 'express'
import fetchuser from '../middleware/fetchuser.js'
import {  createpaypalorder, paypalrefundorder } from '../controllers/paypal.controller.js';

const paypalrouter = express.Router()

// =========== CREATE ORDER ======>
paypalrouter.post('/createOrder', fetchuser,createpaypalorder);

// =========== REFUND ORDER =======>

paypalrouter.post('/refund',fetchuser,paypalrefundorder )

export default paypalrouter
