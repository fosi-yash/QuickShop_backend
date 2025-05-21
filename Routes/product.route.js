import express from 'express'
import dotenv from 'dotenv'
import { uploads } from "../utils/imageUpload.util.js";
import fetchuser from '../middleware/fetchuser.js'
import { addproduct, findProduct, getproduct, removeproductbyid, updateProduct } from '../controllers/product.controller.js'

dotenv.config()
const productrouter = express.Router()

//=========================== ADD PRODUCT ============================>
productrouter.post('/addproduct', uploads.single('image'), addproduct)

// ========================= GET ALL PRODUCTS ===========================>

productrouter.get('/product', fetchuser, getproduct)

// ========================== Remove Product =========================>

productrouter.delete('/removeproduct/:id', fetchuser, removeproductbyid)

// ========================== Remove Product =========================>

productrouter.get('/findproduct/:id', fetchuser, findProduct)

// ========================== Update The Product =====================>

productrouter.put('/updateproduct/:id',uploads.single('image'),updateProduct)
export default productrouter
