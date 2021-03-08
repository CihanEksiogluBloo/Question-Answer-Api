const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./helpers/database/connectDatabase');
const routers = require('./routers/index');
const customErrorHandler = require('./middlewares/errors/custom-error-handler')
const path = require('path');

// Environment variables
dotenv.config({
    path: "./config/env/config.env"
});

// MongoDB Connection

connectDatabase();

const app = express();

// Express Body middleware
app.use(express.json());

const PORT = 3200 || process.env.PORT;

// Routers Middleware
app.use("/api/",routers);
// Error Handler
app.use(customErrorHandler);

app.listen(PORT,()=>{
    console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`);
});

//Static Files
app.use(express.static(path.join(__dirname,"public")))
