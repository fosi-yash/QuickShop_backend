import mongoose from "mongoose";
import slugify from 'slugify'

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    default: '',
  },
  prize: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0, // in percentage
  },
  stock: {
    type: Number,
    required: true,
  },
  images: 
    {
      type:String,
      required:true
    }
  ,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }
});

productSchema.pre('save',function (next){
    if(!this.slug && this.productName){
        this.slug=slugify(this.productName,{lower:true})
    }
    next()
})

const Product = mongoose.model('Product', productSchema);

export default Product