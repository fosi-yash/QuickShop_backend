import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

// ============================= Getting PayPal Access Token =======================>

  export const getAccessToken = async () => {
    const response = await axios({
      url: process.env.PAYPAL_TOKEN_URL,
      method: 'POST',
      data: 'grant_type=client_credentials',
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_CLIENT_SECRET
      }
    })
    return response.data.access_token
  }