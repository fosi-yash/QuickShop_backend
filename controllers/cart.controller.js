import Cart from '../models/Cart.js'

// ======================== ADD TO CART =================================>

export const addtocart = async (req, res) => {
    const id = req.user.id;
    const { productName, prize, quantity, totalAmount, images } = req.body;
    try {

        let cart = new Cart({ userid: id, productName, prize, quantity, totalAmount, images })
        cart = await cart.save()
        console.log("product  has been added to cart successfully !", res)
        res.json({ cart })
    } catch (error) {
        console.log("error occured in add to cart", error)
    }
}

// ========================= GET CART DETAILS ==============================>

export const getcart = async (req, res) => {
    const id = req.user.id;
    const cartData = await Cart.find({ userid: id })
    console.log(cartData)
    res.json(cartData)
}

// ========================== REMOVE PRODUCTS FROM CART=======================>

export const deletecartbyid = async (req, res) => {
    const _id = req.params.id;
    const remove = await Cart.findByIdAndDelete({ _id })
    res.send(remove)
}

// ============================ REMOVE ALL PRODUCTS FROM CART==================>
    
export const deletecart = async (req, res) => {
    const id = req.user.id
    const remove = await Cart.deleteMany({ userid: id });

    res.send(remove)
}