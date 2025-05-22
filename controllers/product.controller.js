import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import slugify from 'slugify';
import fs from 'fs';
import path from 'path';

//=========================== ADD PRODUCT ============================>

export const addproduct = async (req, res) => {
  const { productName, description, prize, stock, category } = req.body
  const images = req.files.map((file) => {
    console.log(file.filename)
   return `/product_images/${file.filename}`
  });

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
      images:images
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

    const products = await Product.aggregate([
      {
        $lookup: {
          from: 'categories', // Make sure this matches your actual MongoDB collection name
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' }, // Flatten the category array
      {
        $match: {
          $or: [
            { productName: { $regex: regex } },
            { 'category.categoryname': { $regex: regex } }
          ]
        }
      }
    ]);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// ==================== Remove Product ==========================>

export const removeproductbyid = async (req, res) => {
  try {
    const id = req.params.id;

    // 1. Find product to get image paths
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. Delete each image from filesystem
    if (product.images && product.images.length > 0) {
      product.images.forEach(imgPath => {
        const fullPath = path.join('uploads', imgPath); // because `imgPath` = "/product_images/filename.jpg"
        fs.unlink(fullPath, err => {
          if (err) {
            console.error("Error deleting image:", fullPath, err.message);
          }
        });
      });
    }

    // 3. Delete the product from the database
    await Product.findByIdAndDelete(id);

    res.json({ message: "Product and associated images removed successfully." });
  } catch (error) {
    console.error("Error in product remove:", error);
    res.status(500).json({ error: "Server error while removing product" });
  }
};

//====================== Find Product By ID =================================>

export const findProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findById(_id).populate('category');

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product); // returning product directly
  } catch (error) {
    console.log("The error occurred in findProduct controller:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

//========================= Update Product =====================================>

export const updateProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const { productName, description, prize, stock, category } = req.body;

    // Check if product exists
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const image = req.file ? `/product_images/${req.file.filename}` : product.images;

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
        productName,
        description,
        prize,
        stock,
        category,
        images: image,
        slug: slugify(productName, { lower: true })
      },
      { new: true } // Return updated document
    );

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error in Update Product:", error);
    res.status(500).json({ error: error.message });
  }
};
