import express from 'express'
import Address from '../models/Address.js'

// ================================= Save User Address ============================>

export const addaddress= async (req, res) => {
    try {
  
      const userid = req.user.id;
      const { name, number, pincode, locality, address, city, state, landmark, display_name } = req.body
      const saveaddress = new Address({ userid, name, number, pincode, locality, address, city, state, landmark ,display_name})
      await saveaddress.save()
      res.json(saveaddress)
    } catch (error) {
      console.log('error occured in addadress', error)
    }
  }

  // ================================= Fetch User Address ===============================>

export const getaddress=async (req, res) => {
    const user = req.user.id;
    try {
      const addresses = await Address.find({ userid: user })
      res.json(addresses)
    } catch (error) {
      console.log(error)
    }
  }

  // ================================== Fetch User Address via ID ===============================>
    
export const getaddressbyid=async (req, res) => {
    const id = req.params.id
    try {
      const address = await Address.findById({ _id: id })
      res.json(address)
    } catch (error) {
      console.log(error)
    }
  }

// ===================================== Remove address =========================================>

  export const removeaddressbyid=async (req,res)=>{
    const id = req.params.id
    try {
      const address = await Address.findByIdAndDelete({ _id: id })
      res.json(address)
    } catch (error) {
      console.log(error)
    }
  }