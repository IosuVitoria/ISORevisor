import { useState, useEffect } from 'react';
import './historial.css';
import { getDocumentsSection } from '../../../../api/documentos';

const Historial = ({ isOpen, onClose, section }) => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocumentsSection(section);
        console.log("Respuesta del servidor: ", response);
        const documentosRecuperados = response.documentos;
        console.log(documentosRecuperados);
        setDocumentos(documentosRecuperados);
        setLoading(false); 
      } catch (error) {
        console.log("Error: ", error);
        setLoading(false); 
      }
    };

    if (isOpen) {
      setLoading(true); 
      fetchData();
    }
  }, [isOpen, section]); 

  const handleCerrar = () => {
    setDocumentos([]);
    onClose();
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Historial de Documentos</h2>
              <span className="modal-close" onClick={onClose}>&times;</span>
            </div>
            <div className="modal-body">
              <table className="documentos-table">
                <thead>
                  <tr>
                    <th>Nombre del Documento</th>
                    <th>Versión del Documento</th>
                    <th>Fecha de Aprobación</th>
                    <th>Localización</th>
                    <th>Autor</th>
                    <th>Revisor</th>
                  </tr>
                </thead>
                <tbody>
                  {documentos.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.nombre_documento}</td>
                      <td>{doc.version_documento}</td>
                      <td>{doc.fecha_aprobacion}</td>
                      <td>{doc.localizacion_documento}</td>
                      <td>{doc.autor_documento}</td>
                      <td>{doc.revisor_documento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCerrar}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Historial;

