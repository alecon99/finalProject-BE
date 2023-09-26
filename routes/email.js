const express = require('express');
const nodemailer = require('nodemailer');

const email = express.Router();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASSWORD}`
    }
});

email.post('/sendEmail', async (req,res)=>{
    const { subject, text } = req.body;

    const emailOptions = {
        from: 'info@NewLife.com',
        to: 'merle.jacobson32@ethereal.email',
        subject,
        text
    }

    transporter.sendMail(emailOptions, (error,info)=>{
        if(error){
            res.status(500).send({
                statusCode: 500,
                message: 'Internal server error',
                error
            })
        } else {
            res.status(200).send({
                statusCode: 200,
                message: 'Email sent successfully',
            })
        }
    })
}) 

module.exports = email;