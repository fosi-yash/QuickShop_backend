import express from 'express'
import dotenv from 'dotenv'
import { categoryupload, uploads } from "../utils/imageUpload.util.js";
import fetchuser from '../middleware/fetchuser.js'
import Category from '../models/Category.js';
import { addcategory, getcategory } from '../controllers/category.controller.js';

dotenv.config()
const categoryrouter=express.Router()

// ===================== Add Category =====================>

categoryrouter.post('/addcategory',fetchuser, categoryupload.single('images'),addcategory)

// ===================== Get All Category ==================>


categoryrouter.get('/category',getcategory)


export default categoryrouter