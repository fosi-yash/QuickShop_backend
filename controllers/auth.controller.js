import express from 'express';
import User from '../models/User.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { error } from 'console';

dotenv.config();
const JWT = process.env.JWT || 'yashisgoodb$oy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

    const { email, password, role } = req.body;

    // find user using email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ success, error: "user has been not found" })
    }

    if (role !== user.role) {
      return res.json({ error: `You are not ${role} \n please try as ${user.role}` })

    }
    if (user.block === true) {
      return res.json({ error: `Mr/Mrs ${user.name.charAt(0).toUpperCase() + user.name.slice(1,)} Your Account Has Been Blocked For SomeTime !` })
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


    res.json({ success, authtoken, role: user.role })
  } catch (error) {
    console.error(error.message)
  }
}

// ======================= Find All Users==========================>

export const findusers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password')
  res.json(users)

}

// ========================= Update User Details =======================>

export const updateuser = async (req, res) => {
  try {
    const _id = req.user.id;
    const { name, email, password, birthdate, mobilenumber, block } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Handle image
    const profilephoto = req.file ? `/profile_images/${req.file.filename}` : user.profilephoto;

    if (req.file && user.profilephoto) {
      const oldImagePath = path.join(__dirname, '../uploads', user.profilephoto);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error('Error deleting old profile photo:', err.message);
        }
      });
    }

    // Handle password update
    let hashedPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name,
        email,
        password: hashedPassword,
        birthdate,
        mobilenumber,
        profilephoto,
        block
      },
      { new: true } // return the updated document
    ).select('-password'); // exclude password

    res.json({ message: 'Updated Successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// ============================ update block user ====================>
export const updateblockuser = async (req, res) => {
  try {
    const _id = req.params.id;
    const { block } = req.body;
    console.log(block)

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updateUser = await User.findByIdAndUpdate(_id, { block })
    res.json({ 'updated successfully': updateUser })
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}



export const finduserbyid = async (req, res) => {
  const _id = req.user.id
  const users = await User.findOne({ _id }).select('-password')
  if (!users) {
    return res.json({ "the user can not find": error })
  }

  res.json(users)

}