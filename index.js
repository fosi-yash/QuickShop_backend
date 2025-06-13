import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import DB_CONNECT from './db.js'
import authrouter from './Routes/auth.route.js'
import path from 'path'
import { fileURLToPath } from 'url'
import paypalrouter from './Routes/paypal.route.js'
import productrouter from './Routes/product.route.js'
import cartrouter from './Routes/cart.route.js'
import orderrouter from './Routes/order.route.js'
import addressrouter from './Routes/address.route.js'
import categoryrouter from './Routes/category.route.js'
import otprouter from './Routes/otp.route.js'

dotenv.config()
    ; (async () => {
        const app = express()
        const port = process.env.PORT || 3000
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        app.use(express.json())
        app.use('/product_images', express.static(path.join(__dirname, 'uploads/product_images')));
        app.use('/category_images', express.static(path.join(__dirname, 'uploads/category_images')));
        app.use('/profile_images', express.static(path.join(__dirname, 'uploads/profile_images')));
        app.use(express.static('dist'));

        app.use(cors({
            origin: '*', // your frontend port
            credentials: true
        }));
        app.use(express.urlencoded({ extended: true }))

        await DB_CONNECT()

        app.get('/', (req, res) => {
            res.send('Hello World from backend')
        })

        app.use('/api', authrouter)
        app.use('/api', categoryrouter)
        app.use('/api', productrouter)
        app.use('/api', addressrouter)
        app.use('/api', orderrouter)
        app.use('/api', cartrouter)
        app.use('/api', paypalrouter)
        app.use('/api', otprouter)
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`)
        })
    })()
