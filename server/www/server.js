var app = require("../app");

require("dotenv").config();

//Estas variables se pueden tener en el archivo que se usan pero en realidad se DEBERÍAN TRAER.
// const HOST = "localhost";
// const PORT = "3001";

const {HOST, PORT} = process.env;

//Función que le dice a APP dónde debe escuhar y levartarse el servidor.
app.listen(PORT, function(err){
    if(err){
        return console.error(err)
    }
    console.log(`Servidor funcionando en http://${HOST}:${PORT}`)
}    
)