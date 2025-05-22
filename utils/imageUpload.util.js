import multer from 'multer'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'; // At the top

// ============================= Multer Storage SetUp =============================>


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/product_images/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(4).toString('hex');
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});


export const uploads = multer({ storage: storage })

// ============================ category image setup =================================>

const multerstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/category_images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

export const categoryupload = multer({ storage: multerstorage })


// ============================= Profile Image Setup ===================================>

const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile_images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

export const profileupload = multer({ storage: profileStorage })