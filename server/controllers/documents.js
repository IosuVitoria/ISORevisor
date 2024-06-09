const db2 = require("../services/db2.js").getConnection();

const test = () => {
    console.log("TEST DE SERVIDOR")
}

// Función para insertar un nuevo documento en la tabla documentos_subidos
const insertarDocumento = async (req, res) => {
    try {
        // Funcionalidad implementada. Extraemos los datos del cuerpo de la solicitud (req.body)
        console.log(req.body)
        const {
            nombre_documento,
            version_documento,
            fecha_aprobacion,
            localizacion_documento,
            autor_documento,
            revisor_documento,
        } = req.body.datosDocumento;

        const {section} = req.body

        // Se crea la consulta SQL
        const sql = `INSERT INTO documentos_subidos 
                    (nombre_documento, version_documento, fecha_aprobacion, localizacion_documento, autor_documento, revisor_documento, seccion) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;

        console.log(sql);

        // Ejecutamos la consulta SQL
        const insertarResponse = await db2.query(sql, [
            nombre_documento,
            version_documento,
            fecha_aprobacion,
            localizacion_documento,
            autor_documento,
            revisor_documento,
            section
        ]);

        console.log(insertarResponse);

        console.log('Documento insertado correctamente');
        res.status(200).json({ message: 'Documento insertado correctamente' });
    } catch (error) {
        console.error('Error al insertar el documento:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getAllDocumentsSection = async (req, res) => {
    const { section } = req.body;
    console.log(section)
    const query = `SELECT * FROM documentos_subidos WHERE seccion = ?`;
  
    try {
      const [rows] = await db2.query(query, [section]);
      console.log('Documentos recuperados correctamente');
      res.status(200).json({
        message: 'Documentos recuperados correctamente.',
        documentos: rows
      });
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getDocumentLastRevision = async (req, res) => {
    const { section, nombre } = req.body;
    console.log(req.body)
    console.log("Sección elegida: ", section);
    console.log("Nombre del documento: ", nombre)
    const query = `SELECT version_documento FROM documentos_subidos WHERE seccion = ? AND nombre_documento = ?`;
  
    try {
      const [rows] = await db2.query(query, [section, nombre]);
      console.log('Versión del documento recuperada correctamente');
      res.status(200).json({
        message: 'Versión del documento recuperada correctamente.',
        documentos: rows
      });
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};
  
 
module.exports = {
    test,
    insertarDocumento,
    getAllDocumentsSection,
    getDocumentLastRevision,
}