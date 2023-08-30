const express = require('express');
const mongoose = require('mongoose');
const ProductModel = require('../models/productModel');
const { productBodyParams, validateProductBody } = require('../middlewares/productValidator');

const product = express.Router();

product.get('/products', async(req,res)=>{
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

product.post('/newProduct', productBodyParams, validateProductBody, async(req,res)=>{
    
    const newProduct = new ProductModel({
        name: req.body.name,
        description: req.body.description,
        images: req.body.images,
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











module.exports = product