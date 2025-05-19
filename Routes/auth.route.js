import express from 'express';
import { body, query, validationResult } from 'express-validator'
import { findusers, login, signup } from '../controllers/auth.controller.js';
import fetchuser from '../middleware/fetchuser.js';

const authrouter = express.Router()

//Request :1 => make post request to create user
authrouter.post('/createuser', signup)
//Request :2 => make post request to login user
authrouter.post('/login', [
    body('email').isEmail().withMessage("Enter valid Email or Password"),
    body('password').notEmpty().withMessage("Enter valid Email or Password")
], login)

authrouter.get('/getusers',fetchuser,findusers)
export default authrouter