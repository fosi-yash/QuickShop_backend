import mongoose from "mongoose";

const DB_CONNECT=async(req,res)=>{
    try {
        await mongoose.connect('mongodb+srv://fosiyash1004:YashPatel%40%23%241410@cluster0.ockktzu.mongodb.net/')
        .then((res)=>{
            console.log("Database conncted successfully")
        })
    } catch (error) {
        console.log("error in database connection")
    }
}

export default DB_CONNECT