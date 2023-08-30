const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const PORT = 5050;


require('dotenv').config()

const app = express();

/* require routes */
const productsRoute = require('./routes/products')

/* middleware */
app.use(express.json());
app.use(cors())

/* routes */
app.use('/', productsRoute)

mongoose.connect(process.env.MONGO_DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Server connection error"));
db.once('open', ()=>{ console.log('Database Mongodb connected')});


app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))