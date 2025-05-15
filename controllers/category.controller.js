import Category from "../models/Category.js";

// ===================== Add Category =====================>

export const addcategory = async (req, res) => {
    const { categoryname,description } = req.body;
    const images=`/category_images/${req.file.filename}`
    try {
        const add = new Category({ categoryname,description,images });
        const addedCategory = await add.save();
        res.json(addedCategory)
    }
    catch (error) {
        console.log('error in add category' + error)
    }
}

// ===================== Get All Category ==================>

export const getcategory = async (req, res) => {
    try {

    } catch (error) {
        console.log('error in get category' + error)
    }
    const category = await Category.find()
    res.json(category)
}