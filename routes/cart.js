const express = require('express')
const mongoose = require('mongoose')
const CartModel = require('../models/cartModel')
const UserModel = require('../models/userModel')

const cart = express.Router()

cart.post('/newCart/:userId', async(req,res)=>{

    const { userId } = req.params;

    const newCart = new CartModel({
        userId: userId,
        product: req.body.product,
        quantity: req.body.quantity,
    })

    try {
        const update = { $push: { cart: newCart}};

        const updateCart = await UserModel.findOneAndUpdate(
            { _id: userId},
            update,
            { new: true}
        )

        await newCart.save();

        res.status(201).send({
            statusCode: 201,
            message: "Comment successfully created",
            updateCart
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error",
            error
        })
    }
} )

cart.delete('/cart/deleteProduct/:cartId/:user', async(req,res)=>{
    const { cartId, user } = req.params;

    try {
        const deleteCartProduct= await CartModel.findByIdAndDelete(cartId)

        const userToUpdate = await UserModel.findOneAndUpdate(
            { _id: user },
            { $pull: { cart: cartId }},
            { new: true}
        )
           
        res.status(200).send({
            statusCode: 200,
            message: `Product with id ${cartId} delete successfully`
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error",
            error,
        })
    }
})

module.exports = cart;