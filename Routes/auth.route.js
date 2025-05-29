import express from 'express';
import { body, query, validationResult } from 'express-validator'
import { finduserbyid, findusers, login, signup, updateblockuser, updateuser } from '../controllers/auth.controller.js';
import fetchuser from '../middleware/fetchuser.js';
import { profileupload } from '../utils/imageUpload.util.js';


const authrouter = express.Router()

//Request :1 => make post request to create user
authrouter.post('/createuser', signup)
//Request :2 => make post request to login user
authrouter.post('/login', [
    body('email').isEmail().withMessage("Enter valid Email or Password"),
    body('password').notEmpty().withMessage("Enter valid Email or Password")
], login)

// Request :3 => make get request to find user 

authrouter.get('/getusers',fetchuser,findusers)

// Request :4 => make put request to update the user profile

authrouter.put('/updateprofile',profileupload.single('image'),fetchuser,updateuser)


// Request :5 => make put request to update the user 

authrouter.put('/updateblockeduser/:id',fetchuser,updateblockuser)

// Request :6 => make get request to find perticular user

authrouter.get('/getuser',fetchuser,finduserbyid)


export default authrouter