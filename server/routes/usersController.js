const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/users.js");

// 1º Funcionalidad implementada. Creación de nuevos usuarios del sistema de gestión.
userRouter.post("/addUser", userController.addUser);

//2º Funcionalidad implementada. Obtener todos los usuarios.
userRouter.get("/getAllUsers", userController.getAllUsers);

module.exports = userRouter;