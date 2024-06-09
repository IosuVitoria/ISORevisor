const express = require("express");
const testRouter = express.Router();

const testController = require("../controllers/test");

//Rutas a los controladores.

testRouter.get("/test", testController.test);

module.exports = testRouter;