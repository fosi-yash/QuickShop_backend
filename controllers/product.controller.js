import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

//=========================== ADD PRODUCT ============================>

export const addproduct = async (req, res) => {
    const { productName, description, prize, stock, category } = req.body
    const images = `/product_images/${req.file.filename}`

    try {
        // Validate category ID
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ error: "Invalid category ID" });
        }

        const product = new Product({
            productName,
            description,
            prize,
            stock,
            category: new mongoose.Types.ObjectId(category),
            images
        });

        await product.save()
        res.json(product)
        console.log("Product Added Successfully")
    } catch (error) {
        console.log("error in add product " + error)
        res.status(500).json({ error: error.message });
    }
}

// ========================= GET ALL PRODUCTS ===========================>


export const getproduct = async (req, res) => {
  try {
    const search = req.query.search || '';
    const regex = new RegExp(search, 'i');


    const products =  await Product.aggregate([

      {
        $lookup: {
          from: 'categories', // Make sure this matches your actual MongoDB collection name
          localField: 'category',
          foreignField: '_id',
          as: 'categoryDetails'
        }
      },
      { $unwind: '$categoryDetails' },
      {
        $match: {
          $or: [
            { productName: { $regex: regex } },
            { 'categoryDetails.categoryname': { $regex: regex } }
          ]
        }
      }
    ]);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};



// ==================== Remove Product ==========================>

export const removeproductbyid = async (req, res) => {
    try {
        const id = req.params.id;
        const remove = await Product.findByIdAndDelete({ _id: id })
        res.json({ remove: 'Product Removed' })

    } catch (error) {
        res.json({ "error in product remove": error })
    }

}