const express = require('express');
const mongoose = require('mongoose');
const ProductModel = require('../models/productModel');
const { productBodyParams, validateProductBody } = require('../middlewares/productValidator');

const product = express.Router();

product.get('/products', async(req,res)=>{
    const { page = 1 , pageSize = 2 } = req.query
    try {
        const proucts = await ProductModel.find()
        .limit(pageSize)

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

/* product.get('product/allCategory', async(req,res)=>{

    try {
        const uniqueCategory = await ProductModel.aggregate([
            {$unwind: 'category'},
            {$group: {_id: 'category'}}
        ])

        const categoryList = uniqueCategory.map(c => c._id)

        res.status(200).send({
            statusCode: 200,
            categoryList
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error
        })
    }
}); */

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



product.delete('/deleteProduct/:productId', async(req,res)=>{
    const {productId} = req.params;

    try {
        const productById= await ProductModel.findByIdAndDelete(productId)

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