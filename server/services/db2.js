//Este archivo crea la conexión con la base de datos MYSQL. Es el encargado de permitir la conexión a la base de datos.

const mysql = require ("mysql2/promise");
require("dotenv").config();

const {HOST, DB_USER, DB_NAME, DB_PASSWORD} = process.env;

var con;

var createConnection = (module.exports.createConnection = function () {

    let config = {
        host: HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        dateStrings: true,
    };
    console.log(config);
    return mysql.createPool(config);
});


module.exports.getConnection = function () {
    if(!con){
        con = createConnection();
    }
    return con;
}