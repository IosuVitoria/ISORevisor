const db2 = require("../services/db2.js").getConnection();

const test = () => {
    console.log("TEST DE SERVIDOR")
}

const addUser = (req, res) => {
    const { nombre, apellido, email, fechaAlta, cargo } = req.body;
  
    if (!nombre || !apellido || !email || !fechaAlta || !cargo) {
      return res.status(400).json({ error: 'Rellena todos los campos' });
    }
  
    const sql = 'INSERT INTO users (nombre, apellido, email, fechaAlta, cargo) VALUES (?, ?, ?, ?, ?)';
    const values = [nombre, apellido, email, fechaAlta, cargo];
  
    db2.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Error inserting data' });
      }
      res.status(201).json({ message: 'User added successfully', userId: result.insertId });
    });
};


const getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM users';
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return res.status(500).json({ error: 'Error fetching data' });
      }
      res.status(200).json(results);
    });
};
  
module.exports = {
    test,
    addUser,
    getAllUsers
};