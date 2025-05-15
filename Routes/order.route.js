import express from 'express'
import dotenv from 'dotenv'
import fetchuser from '../middleware/fetchuser.js'
import { addorder, getallorder, getlastorder, getorderbyid, orderdeletebtid } from '../controllers/order.controller.js'

dotenv.config()
const orderrouter = express.Router()

// =============================== Save Order Details ============================>

orderrouter.post('/addorder', fetchuser,addorder);

// ========================== Update Order Details ==================================>

orderrouter.put('/updateorder/:id',fetchuser,orderdeletebtid )

// ========================== display Current Order Details==========================>

orderrouter.get('/lastorder', fetchuser,getlastorder )

// =========================== Display All Orders ======================================>

orderrouter.get('/userorders', fetchuser,getallorder )

// =========================== display Perticular Order Details==========================>

orderrouter.get('/orderdetails/:id', fetchuser,getorderbyid )

export default orderrouter