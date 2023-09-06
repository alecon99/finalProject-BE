const express = require('express');
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = express.Router();

login.post('/login', async (req,res)=>{

    const user = await UserModel.findOne({ email: req.body.email })

    if(!user){
        return res.status(404).send({
            statusCode: 404,
            message: 'Invalid password or email'
        })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword){
        return res.status(400).send({
            statusCode: 400,
            message: 'Invalid password or email'
        })
    }

    const token = jwt.sign({
        name: user.name,
        surname: user.surname,
        role: user.role,
        id: user._id
    },
    process.env.JWT_SECRET, 
    { expiresIn: "24h" })

    res.header('Authorization', token).status(200).send({
        statusCode: 200,
        token
    })
})

module.exports = login;