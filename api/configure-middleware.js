const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//custom middleware

function logger(req, res, next) {
    const newDate = new Date(Date.now());
    console.log((`${req.method} to ${req.originalUrl} at ${newDate.toDateString()}, ${newDate.toTimeString()}`))
    next();
};

module.exports = server => {
    server.use(helmet());
    server.use(express.json());
    server.use(cors());
    server.use(logger);
};
