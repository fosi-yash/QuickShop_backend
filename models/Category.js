import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema({
    categoryname: {
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
    images: {
        type: String,
        required:true
    }
});

categorySchema.pre('save', function (next) {
    if (!this.slug && this.categoryname) {
        this.slug = slugify(this.categoryname, { lower: true })
    }
    next()
})

const Category = mongoose.model('Category', categorySchema);

export default Category