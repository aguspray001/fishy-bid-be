const express = require('express');
const app = express();

exports.errorHandler = async (error, req, res, next) =>{
        const status = error.errorStatus || 500;
        const message = error.message;
        const data = error.data;

        res.status(status).json({ message: message, data: data });
        next();
}