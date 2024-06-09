//Importaciones iniciales a la hora de poner marcha el server.

const express = require("express");
const mysql = require("mysql2");
const bp = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const http = require("http");

//Requerimiento de dotenv para poder usar después las variables configuradas en el .env.
require("dotenv").config();

//Instanciación de express para la creación del server node.
const app = express();

//Uso de cors antes de las rutas. Si este uso del cors se produce después de las rutas estas no funcionaran.
app.use(
    cors({
        origin:"*",
        //Colocando el asterisco permito el uso del server desde cualquier dirección.
    })
);

app.use(express.urlencoded({extended: true}));
//Permitir el uso de los json en los controladores.
app.use(express.json());

//Rutas requerimiento.
const testRouter = require("./routes/test");
const documentRouter = require("./routes/documentController")


//Rutas uso.
app.use("/", testRouter)
app.use("/documents", documentRouter)


const httpServer = http.createServer(app);
module.exports = httpServer;