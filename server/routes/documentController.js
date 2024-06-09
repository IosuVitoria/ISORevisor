const express = require("express");
const documentRouter = express.Router();

const documentController = require("../controllers/documents");

//Rutas a los controladores.

documentRouter.get("/test", documentController.test);

//1º Funcionalidad: Insertar documento en la base de datos. 
documentRouter.post("/insertarDocumento", documentController.insertarDocumento);

//2º Funcionalidad: Insertar documento en la base de datos. 
documentRouter.post("/getAllDocumentsSection", documentController.getAllDocumentsSection);

//3º Funcionalidad: Validación para insertar documento. Evitar que se repita versión del mismo.
documentRouter.post("/getDocumentLastRevision", documentController.getDocumentLastRevision);

//4º Funcionalidad: Eliminar un documento que no se necesite. Implementado en Historial.jsx

module.exports = documentRouter;