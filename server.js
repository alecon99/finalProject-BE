const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const PORT = 5050;

require('dotenv').config()

const app = express();

/* require routes */
const productsRoute = require('./routes/products')
const usersRoute = require('./routes/users')
const loginRoute = require('./routes/login')
const cartRoute = require('./routes/cart')
const ordersRoute = require('./routes/orders')
const emailRoute = require('./routes/email')

/* middleware */
app.use(express.json());
app.use(cors())

/* routes */
app.use('/', productsRoute)
app.use('/', usersRoute)
app.use('/', loginRoute)
app.use('/', cartRoute)
app.use('/', ordersRoute)
app.use('/', emailRoute)

mongoose.connect(process.env.MONGO_DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Server connection error"));
db.once('open', ()=>{ console.log('Database Mongodb connected')});


app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))