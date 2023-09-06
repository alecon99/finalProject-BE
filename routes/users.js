const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../models/userModel');
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

user.post('/user/registration', async(req,res)=>{

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
    const newUser = new UserModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword,
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


module.exports = user;