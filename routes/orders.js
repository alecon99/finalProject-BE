const express = require('express');
const mongoose = require('mongoose');
const OrderModel = require('../models/orderModels');
const UserModel = require('../models/userModel');

const order = express.Router();

order.get('/orders', async(req,res)=>{

    try {
        const orders = await OrderModel.find()

        const counter = await OrderModel.count()

        res.status(200).send({
            statusCode: 200,
            counter: counter,
            orders: orders 
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error
        })
    }
});

order.post('/newOrder/:userId', async(req,res)=>{

    const { userId } = req.params;

    const newOrder = new OrderModel({
        userId: userId,
        cart: req.body.cart,
        state: req.body.state,
        shippingAddress: req.body.shippingAddress,
        paid: req.body.paid
    })

    try {
        const update = { $push: { order: newOrder}};

        const updateOrder = await UserModel.findOneAndUpdate(
            { _id: userId},
            update,
            { new: true}
        )

        await newOrder.save();

        res.status(201).send({
            statusCode: 201,
            message: "Order successfully created",
            updateOrder
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error",
            error
        })
    }
} )

order.put('/modOrder/:orderId', async(req,res)=>{
    const { orderId } = req.params

    const modOrder = {
        state: req.body.state
    }

    try {
        const result = await OrderModel.findByIdAndUpdate(
            orderId,
            modOrder,
            { new: true }
        )

        res.status(200).send({
            statusCode: 200,
            message: `Order with id ${orderId} modified successfully`,
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

module.exports = order;