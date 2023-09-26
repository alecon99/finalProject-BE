const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../models/userModel');
const { userBodyParams, validateUserBody } = require('../middlewares/userValidator');

const bcrypt = require('bcrypt')

const user = express.Router();

user.get('/users', async(req,res)=>{

    try {
        const users = await UserModel.find().populate("cart")

        const counter = await UserModel.count()

        res.status(200).send({
            statusCode: 200,
            counter: counter,
            users: users 
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error
        })
    }
});

user.get('/user/:userId', async(req,res)=>{

    const {userId} = req.params;

    try {
        const userById = await UserModel.findById(userId).populate("order")

        res.status(200).send({
            statusCode: 200,
            userById
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error",
            error
        })
    }
})

user.get('/user/cart/:userId', async(req,res)=>{

    const {userId} = req.params;

    try {
        const userById = await UserModel.findById(userId).populate("cart")

        const cart = userById.cart

        res.status(200).send({
            statusCode: 200,
            cart
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error",
            error
        })
    }
})

user.get('/user/order/:userId', async(req,res)=>{

    const {userId} = req.params;

    try {
        const userById = await UserModel.findById(userId).populate("order")

        const order = userById.order

        res.status(200).send({
            statusCode: 200,
            order
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error",
            error
        })
    }
})

user.post('/user/registration',userBodyParams, validateUserBody, async(req,res)=>{

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
    const newUser = new UserModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword,
        shippingAddress: req.body.shippingAddress,
        phone: req.body.phone,
        role: req.body.role
    })
    
    try {
        const user = await newUser.save()
        
        res.status(201).send({
            statusCode: 201,
            message: 'User saved successfully',
            payload: user
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error
        })
    }
});

user.put('/user/modPassword/:userId', async(req,res)=>{
    const { userId } = req.params

    const userById = await UserModel.findById(userId)

    const validPassword = await bcrypt.compare(req.body.oldPassword, userById.password)
    
    if(!validPassword){
        return res.status(400).send({
            statusCode: 400,
            message: 'Invalid password'
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt)
    
    const newPassword = {
        password: hashedPassword
    }
    
    try {
        const result = await UserModel.findByIdAndUpdate(
            userId,
            newPassword,
            { new: true }
        )
        
        res.status(201).send({
            statusCode: 201,
            message: `User with id ${userId} modify successfully`,
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error
        })
    }
});

user.put('/user/modEmail/:userId', async(req,res)=>{
    const { userId } = req.params

    const newEmail = {
        email: req.body.email
    }
    
    try {
        const result = await UserModel.findByIdAndUpdate(
            userId,
            newEmail,
            { new: true }
        )
        
        res.status(201).send({
            statusCode: 201,
            message: `User with id ${userId} modify successfully`,
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error
        })
    }
});

user.put('/user/modPersonalData/:userId', async(req,res)=>{
    const { userId } = req.params

    const newPersonalData = {
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone
    }
    
    try {
        const result = await UserModel.findByIdAndUpdate(
            userId,
            newPersonalData,
            { new: true }
        )
        
        res.status(201).send({
            statusCode: 201,
            message: `User with id ${userId} modify successfully`,
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error
        })
    }
});

user.put('/user/newAddress/:userId', async(req,res)=>{
    const { userId } = req.params

    const userExist = await UserModel.findById(userId)

    if(!userExist){
        return res.status(404).send({
            statusCode: 404,
            message: `Product by id ${id} non found`
        })
    }
    
    const addUserAddress = {
        shippingAddress: req.body.shippingAddress
    }
    
    try {
        const result = await UserModel.findByIdAndUpdate(
            userId,
            addUserAddress,
            { new: true }
        )
        
        res.status(201).send({
            statusCode: 201,
            message: `User with id ${userId} modify successfully`,
            payload: user
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error
        })
    }
});

user.delete('/deleteUser/:userId', async(req,res)=>{
    const {userId} = req.params;

    try {
        const deleteUserById= await UserModel.findByIdAndDelete(userId)

        res.status(200).send({
            statusCode: 200,
            message: `User with id ${userId} delete successfully`
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error",
            error
        })
    }
})

module.exports = user;