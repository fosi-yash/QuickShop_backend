import express from 'express'
import dotenv from 'dotenv'
import fetchuser from '../middleware/fetchuser.js'
import { addtocart, deletecart, deletecartbyid, getcart } from '../controllers/cart.controller.js'

dotenv.config()
const cartrouter = express.Router()

// ======================== ADD TO CART =================================>

cartrouter.post('/addtocart', fetchuser, addtocart)

// ========================= GET CART DETAILS ==============================>

cartrouter.get('/cart', fetchuser, getcart)
// ========================== REMOVE PRODUCTS FROM CART=======================>

cartrouter.delete('/removecart/:id', fetchuser, deletecartbyid)

// ============================ REMOVE ALL PRODUCTS FROM CART==================>

cartrouter.delete('/removeall', fetchuser, deletecart)

export default cartrouter