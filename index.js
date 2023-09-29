//1  Automatically load .env file into the application
require('dotenv').config()


//2 import express
const express= require('express')

    //6 import cors
    const cors = require('cors')

    //9 import connection.js
    require('./connection')

    //10 import router
    const router = require('./routes/router')


//3 Create an application using the express
const server = express()

//4 define the port
const PORT = 5000

    //7 use cors in server app
    server.use(cors())
    //to convert object data into array 
    server.use(express.json())
    server.use(router)  


//5 run the application
server.listen(PORT,()=>{
    console.log('listening on the port'+PORT);
})


//8 define routes
server.get('/',(req,res)=>{
    res.status(200).json('Ecommerce Service started')
})
