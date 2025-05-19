import express from 'express'
import dotenv from 'dotenv'
import fetchuser from '../middleware/fetchuser.js'
import { addorder, allorder, getallorder, getlastorder, getorderbyid, orderdeletebtid, revanue } from '../controllers/order.controller.js'
import Order from '../models/Order.js'

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

// ========================= Display All Orders From All Users ===========================>

orderrouter.get('/allorders', fetchuser,allorder )


// =========================== display Perticular Order Details==========================>

orderrouter.get('/orderdetails/:id', fetchuser,getorderbyid )

// =========================== getting monthly summary =================================>

orderrouter.get('/monthly-summary', revanue);

export default orderrouter