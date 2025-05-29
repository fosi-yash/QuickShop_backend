import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    birthdate:{
        type:String
    },
    mobilenumber:{
        type:String
    },
    profilephoto:{
        type:String
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    date: {
        type: Date,
        default: Date.now

    },
    block:{
        type:Boolean,
        required:true,
        default:false
    }
})

const User = mongoose.model('User', UserSchema)

export default User