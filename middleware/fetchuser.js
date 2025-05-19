import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const JWT=process.env.JWT || 'yashisgoodb$oy';

const fetchuser = async (req, res, next) => {
    // get the user from jwt token and add user id to req object 
    const token=req.header('auth-token')
    if(!token){
        return res.status(401).send({error:"pls authenticate using valid user"})
    }
    try {

        const data = jwt.verify(token,JWT)
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({error:"pls authenticate using valid user"})
    }
}

export default fetchuser