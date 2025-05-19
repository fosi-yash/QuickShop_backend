import express from 'express'
import dotenv from 'dotenv'
import { uploads } from "../utils/imageUpload.util.js";
import fetchuser from '../middleware/fetchuser.js'
import { addproduct, getproduct, removeproductbyid } from '../controllers/product.controller.js'

dotenv.config()
const productrouter = express.Router()

//=========================== ADD PRODUCT ============================>
productrouter.post('/addproduct', uploads.single('image'), addproduct)

// ========================= GET ALL PRODUCTS ===========================>

productrouter.get('/product', fetchuser, getproduct)

// ========================== Remove Product =========================>

productrouter.put('/removeproduct',fetchuser,removeproductbyid)

export default productrouter
