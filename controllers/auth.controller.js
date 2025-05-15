import express from 'express'
import User from '../models/User.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import {  validationResult } from 'express-validator'
dotenv.config();
const JWT = process.env.JWT || 'yashisgoodb$oy';

//Request :1 ============> make post request to create user

export const signup = async (req, res) => {
    const result = validationResult(req);
    // the message 
    let success = false
    // is result is not empty then return array of errors
    if (!result.isEmpty()) {
        return res.send({ 'errors': result.array() });
    }
    // find user using findOne() method
    let user = await User.findOne({ email: req.body.email })
    // if user has been already exist thwn return errors
    if (user) {
        return res.status(400).json({
            success,
            error: 'sorry a user with this email already exist'
        })
    }
    let salt = await bcrypt.genSalt(10)
    let secpas = await bcrypt.hash(req.body.password, salt)
    // if user not exist then create new user and save the data in database
    try {
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpas
        });

        const data = {
            user: {
                id: user._id
            }
        };
        let authtoken = jwt.sign(data, JWT);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

}

//Request :2 ==============> make post request to login user

export const login = async (req, res) => {
    try {
        let success = false
        const result = validationResult(req);
        // is result is not empty then return array of errors
        if (!result.isEmpty()) {
            return res.send({ 'errors': result.array() });
        }
        const { email, password,role } = req.body;
        // find user using email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ success, error: "user has been not found" })
        }
        if(role!==user.role){
            return res.json({error:`You are not ${role} \n please try as ${user.role}`})
        }
        // make hash password and compare password which stro in database
        let passwordcompare = await bcrypt.compare(password, user.password)
        if (!passwordcompare) {
            return res.status(400).send({ success, error: "password does not match" })
        }
        // create payload object
        const data = {
            user: {
                id: user._id
            }
        }
        let authtoken = jwt.sign(data, JWT)
        success = true
        console.log(authtoken)

        res.json({ success, authtoken, role:user.role })
    } catch (error) {
        console.error(error.message)
    }
}