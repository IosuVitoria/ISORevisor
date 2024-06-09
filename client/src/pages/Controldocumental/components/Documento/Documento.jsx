import { useState, useEffect, useCallback } from 'react';
import './documento.css';
import { getDocumentLastRevision, insertarDocumento } from '../../../../api/documentos';
import ErrorModal from '../../../../shared/Error/ErrorModal';

const DocumentModal = ({ isOpen, onClose, section }) => {
  // Estado para almacenar los datos del documento
  const [datosDocumento, setDatosDocumento] = useState({
    nombre_documento: '',
    version_documento: '',
    fecha_aprobacion: '',
    localizacion_documento: '',
    autor_documento: '',
    revisor_documento: '',
  });

  const [nombre, setNombre] = useState('');
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState('');

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosDocumento({ ...datosDocumento, [name]: value });
  };

  // Asegurarse de que se carga el nombre para enviarlo al server.
  useEffect(() => {
    setNombre(datosDocumento.nombre_documento);
  }, [datosDocumento.nombre_documento]);

  // Función para guardar los datos del documento
  const enviar = useCallback(async () => {
    try {
      const responseSection = await getDocumentLastRevision(nombre, section);
      console.log("Esta es mi respuesta: ", responseSection);

      if (responseSection.documentos.length === 0) {
        if (datosDocumento.fecha_aprobacion.trim() === '') {
          setErrorMensaje("No se puede subir nada sin aprobación por parte de dirección.");
          setErrorModalOpen(true);
          return;
        }

        const response = await insertarDocumento(datosDocumento, section);
        console.log(response);
      } else {
        setErrorMensaje("Ya tienes un documento con esa revisión. Revisa la subida.");
        setErrorModalOpen(true);
        return;
      }
    } catch (error) {
      console.log("Error: ", error);
      setErrorMensaje("Error interno del servidor. Por favor, inténtalo de nuevo más tarde.");
      setErrorModalOpen(true);
    }
    onClose();
  }, [nombre, datosDocumento, section, onClose]);

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalles del Documento</h2>
              <span className="modal-close" onClick={onClose}>&times;</span>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre del Documento</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre_documento"
                    value={datosDocumento.nombre_documento}
                    onChange={handleChange}
                    placeholder="Ingrese el nombre del documento"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="version">Versión del Documento</label>
                  <input
                    type="text"
                    id="version"
                    name="version_documento"
                    value={datosDocumento.version_documento}
                    onChange={handleChange}
                    placeholder="Ingrese la versión del documento"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fecha">Fecha de Aprobación</label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha_aprobacion"
                    value={datosDocumento.fecha_aprobacion}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="localizacion">Localización</label>
                  <input
                    type="text"
                    id="localizacion"
                    name="localizacion_documento"
                    value={datosDocumento.localizacion_documento}
                    onChange={handleChange}
                    placeholder="Ingrese la localización del documento"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="autor">Autor</label>
                  <input
                    type="text"
                    id="autor"
                    name="autor_documento"
                    value={datosDocumento.autor_documento}
                    onChange={handleChange}
                    placeholder="Ingrese el autor del documento"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="revisor">Revisor</label>
                  <input
                    type="text"
                    id="revisor"
                    name="revisor_documento"
                    value={datosDocumento.revisor_documento}
                    onChange={handleChange}
                    placeholder="Ingrese el revisor del documento"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={enviar}>Guardar</button>
              <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      <ErrorModal isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} errorMessage={errorMensaje} />
    </>
  );
};

export default DocumentModal;
