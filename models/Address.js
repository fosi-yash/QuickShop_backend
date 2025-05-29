import mongoose, { Schema } from 'mongoose'

const AddressSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    locality:{
        type:String,
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,

    },
    state:{
        type:String,
        required:true
    },
    landmark:{
        type:String,

    },
    display_name:{
        type:String,
    }
})

const Address=mongoose.model('Address',AddressSchema)
export default Address