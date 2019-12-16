const express = require("express");
const helmet = require("helmet");

// const RecipeRouter = require("./recipe/recipes-router");


const server = express();

server.use(helmet(), express.json(), logger);

// server.use("/api/recipe", RecipeRouter);


//initial GET
server.get('/', (req, res) => {
    const message = process.env.MSG || "Hello World"
    res.json({ message });
});

//custom middleware

function logger(req, res, next) {
    const newDate = new Date(Date.now());
    console.log((`${req.method} to ${req.originalUrl} at ${newDate.toDateString()}, ${newDate.toTimeString()}`))
    next();
};

module.exports = server;