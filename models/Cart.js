import mongoose, { Schema } from "mongoose";
import { type } from "os";

const cartSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productName: {
        type: String,
        required: true
    },
    prize: {
        type: String,
        required: true
    },
    images:{
        type:String,
        required:true
    },
    quantity: {
        type: String,
        required: true
    },
    totalAmount: {
        type: String,
        required: true
    },
    
})

const Cart = mongoose.model('Cart', cartSchema)

export default Cart