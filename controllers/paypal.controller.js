import { getAccessToken } from '../utils/paypal.util.js'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

// ====================== CREATE ORDER =====================>

export const createpaypalorder= async (req, res) => {
    try {
      const { products, shippingCharge } = req.body;
      console.log(req.body)
  
      const items = products.map((product) => ({
        name: product.productName,
        unit_amount: {
          currency_code: 'USD',
          value: parseFloat(product.prize).toFixed(2)
        },
        quantity: product.quantity.toString()
      }));
  
      const itemTotal = products.reduce((sum, p) => sum + (parseFloat(p.prize) * parseInt(p.quantity)), 0).toFixed(2);
      const shipping = parseFloat(shippingCharge || 0).toFixed(2);
      const totalValue = (parseFloat(itemTotal) + parseFloat(shipping)).toFixed(2);
  
      const token = await getAccessToken();
  
      const response = await axios.post(
        'https://api-m.sandbox.paypal.com/v2/checkout/orders',
        {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: totalValue,
                breakdown: {
                  item_total: { currency_code: 'USD', value: itemTotal },
                  shipping: { currency_code: 'USD', value: shipping }
                }
              },
              items: items
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      const orderID = response.data.id;
      console.log("Created PayPal Order:", orderID);
      res.json({ orderID });
    } catch (error) {
      console.error('Error creating order:', error.response?.data || error.message);
      res.status(500).send({ error: 'Failed to create PayPal order' });
    }
  }

// ========================== REFUND ORDER ===========================>

  export const paypalrefundorder=async (req, res) => {
    const { captureid } = req.body
    const token = await getAccessToken()
    const uuid = crypto.randomUUID()
    try {
      const response = await fetch(`https://api-m.sandbox.paypal.com/v2/payments/captures/${captureid}/refund`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'PayPal-Request-Id': uuid,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({})
      })
      const refund = await response.json()
      console.log(refund)
      res.json(refund)
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  
  }