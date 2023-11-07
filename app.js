const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
require('dotenv').config();
const path = require('path');

const cors = require("cors");
const Usuario = require('./model/usuario'); 
const controllers = require("./controllers");
const verifyToken = require("./middlewares/verifyToken");
const app = express();
mongoose.set('strictQuery', false);

const corsOptions = {
  origin: "https://proyectofinaldevcamp.shop", // Reemplaza con la URL de tu frontend
};

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Database URI:
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.5pgmd8c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Base de datos conectada");
    
    // Rutas
    app.get("/api/user", verifyToken, controllers.getUserById);
    app.post("/api/register", controllers.register);
    app.post("/api/login", controllers.login);
    app.post("/api/forgot-password", controllers.passwordRecovery);
    app.post("/api/new-password", controllers.newpassword);
    app.post("/api/new-post", controllers.newPost);
    app.get('/api/publicaciones', controllers.publicaciones);
    app.get('/api/blog-detail', controllers.getBlogItem);

    
    app.listen(PORT, function () {
      console.log(`App listening on ${PORT}`);
    });
  })
  .catch(e => console.log(e));
module.exports = app;