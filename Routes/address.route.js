import express from 'express'
import dotenv from 'dotenv'
import fetchuser from '../middleware/fetchuser.js'
import { addaddress, getaddress, getaddressbyid, removeaddressbyid } from '../controllers/address.controller.js'
dotenv.config()
const addressrouter = express.Router()

// ================================= Save User Address ============================>

addressrouter.post('/addaddress', fetchuser,addaddress)

// ================================= Fetch User Address ===============================>

addressrouter.get('/addresses', fetchuser, getaddress)

// ================================== Fetch User Address via ID ===============================>

addressrouter.get('/address/:id', fetchuser, getaddressbyid)

// ================================== Rmove User Address via ID ===============================>

addressrouter.delete('/address/:id',fetchuser, removeaddressbyid)

export default addressrouter
