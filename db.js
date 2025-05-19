import mongoose from "mongoose";

const DB_CONNECT=async(req,res)=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/paypal')
        .then((res)=>{
            console.log("Database conncted successfully")
        })
    } catch (error) {
        console.log("error in database connection")
    }
}

export default DB_CONNECT