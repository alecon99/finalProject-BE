const express = require('express');
const mongoose = require('mongoose');
const ProductModel = require('../models/productModel');
const { productBodyParams, validateProductBody } = require('../middlewares/productValidator');
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const product = express.Router();

product.get('/products', async(req,res)=>{
    const { page = 1 , pageSize = 2 } = req.query
    try {
        const proucts = await ProductModel.find()
        .limit(pageSize)
        .sort({createdAt: -1})

        const counter = await ProductModel.count()

        res.status(200).send({
            statusCode: 200,
            counter: counter,
            pageSize: +pageSize,
            products: proucts 
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error
        })
    }
});

product.get('/allProducts', async(req,res)=>{

    try {
        const proucts = await ProductModel.find()
        .sort({createdAt: -1})

        const counter = await ProductModel.count()

        res.status(200).send({
            statusCode: 200,
            counter: counter,
            products: proucts 
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error
        })
    }
});

product.get('/product/:productId', async(req,res)=>{
    const {productId} = req.params;

    try {
        const productById= await ProductModel.findById(productId)

        res.status(200).send({
            statusCode: 200,
            productById
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error",
            error
        })
    }
})

product.get('/filterProducts/:filter', async(req,res)=>{
    const { filter } = req.params;

    if(!filter){
        return res.status(404).send({
            statusCode: 404,
            message: `Filter non found`
        })
    }
    
    try {
        const findIsActive = await ProductModel.find({ "category": filter })

        res.status(200).send({
            statusCode: 200,
            products: findIsActive
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error",
            error
        })
    }  
})

cloudinary.config({
	cloud_name: process.env.CLOURINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "productImage",
		format: async (req, file) => "png",
		public_id: (req, file) => file.name,
	},
});

const cloudUpload = multer({ storage: cloudStorage });

product.post("/image/cloudUploadImg",cloudUpload.single("image"), async (req, res) => {
		try {
			res.status(200).json({ image: req.file.path });
		} catch (error) {
			console.error("File upload failed:", error);
			res.status(500).json({ error: "File upload failed" });
		}
	}
);

product.post('/newProduct', productBodyParams, validateProductBody, async(req,res)=>{
    
    const newProduct = new ProductModel({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: Number(req.body.price),
        category: req.body.category,
        availability: req.body.availability
    })
    
    try {
        const product = await newProduct.save()
        
        res.status(201).send({
            statusCode: 201,
            message: 'Product saved successfully',
            payload: product
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error
        })
    }
});

product.put('/modProduct/:poductId', async(req,res)=>{
    const { poductId } = req.params

    const productExist = await ProductModel.findById(poductId)

    if(!productExist){
        return res.status(404).send({
            statusCode: 404,
            message: `Product by id ${poductId} non found`
        })
    }

    const modProduct = {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        availability: req.body.availability
    }

    try {
        const result = await ProductModel.findByIdAndUpdate(
            poductId,
            modProduct,
            { new: true }
        )

        res.status(200).send({
            statusCode: 200,
            message: `Product with id ${poductId} modify successfully`,
            result
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error",
            error
        })
    }
})


product.delete('/deleteProduct/:productId', async(req,res)=>{
    const {productId} = req.params;

    try {
        const deleteProductById= await ProductModel.findByIdAndDelete(productId)

        res.status(200).send({
            statusCode: 200,
            message: `Product with id ${productId} delete successfully`
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error",
            error
        })
    }
})


module.exports = product