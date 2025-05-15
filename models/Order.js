import mongoose, { Schema } from 'mongoose'
const orderSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
        type: String,
        required: true
    },
    orderID:{
        type:String,
        required:true,
        uniqu:true
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Address',
        required:true
    },
    products: [{
        productname: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        prize: {
            type: String,
            required: true
        }
    }],
    totalprice: {
        type: String,
        required: true
    },
    paymentid: {
        type: String,
        required: true
    },
    captureid:{
        type:String
    },
    refundid:{
        type:String
    },
    paymentstatus: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED'],
        default: 'PENDING',
        required: true
    },
    paymentdate: {
        type: Date,
        default: Date.now(),
        required: true
    }
},{timestamps:true});

const Order = mongoose.model('Order', orderSchema);

export default Order;
