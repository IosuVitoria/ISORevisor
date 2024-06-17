const db2 = require("../services/db2.js").getConnection();

const test = () => {
    console.log("TEST DE SERVIDOR")
}


const addUser = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud (req.body)
    const {
      nombre,
      apellido,
      email,
      fechaAlta,
      cargo,
    } = req.body.newUser;

    if (!nombre || !apellido || !email || !fechaAlta || !cargo) {
      return res.status(400).json({ error: 'Rellena todos los campos' });
    }

    const sql = 'INSERT INTO users (nombre, apellido, email, fechaAlta, cargo) VALUES (?, ?, ?, ?, ?)';
    const values = [nombre, apellido, email, fechaAlta, cargo];

    const result = await db2.query(sql, values, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });

    console.log('Usuario insertado correctamente:', result);


    res.status(201).json({ message: 'Usuario insertado correctamente', userId: result.insertId });

  } catch (error) {
    console.error('Error al insertar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



const getAllUsers = async (req, res) => {
  const sql = 'SELECT * FROM users';

  try {
    const results = await db2.query(sql);
    console.log('Usuarios obtenidos correctamente:', results[0]);
    res.status(200).json(results[0]);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};


  
module.exports = {
    test,
    addUser,
    getAllUsers
};