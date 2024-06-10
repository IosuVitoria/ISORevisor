import { HOST, PORT } from "../config";

export const insertarDocumento = async (datosDocumento, section) => {
    try {
      const response = await fetch(`http://${HOST}:${PORT}/documents/insertarDocumento`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({datosDocumento: datosDocumento, section: section})
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
      } else {
        console.error('Error al enviar el documento:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar el documento:', error);
    }
};
  
export const getDocumentsSection = async ( section) => {
    try {
      const response = await fetch(`http://${HOST}:${PORT}/documents/getAllDocumentsSection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({section: section})
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
        return responseData;
      } else {
        console.error('Error al recuperar documentos: ', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error al recuperar documentos: ', error);
      return null;
    }
};
  
export const getDocumentLastRevision = async ( nombre_documento, section) => {
    try {
      const response = await fetch(`http://${HOST}:${PORT}/documents/getDocumentLastRevision`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({section: section, nombre: nombre_documento})
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
        return responseData;
      } else {
        console.error('Error al recuperar revision del documento: ', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error al recuperar revision del documento: ', error);
      return null;
    }
};

export const deleteDocument = async (id) => {
  try {
    const response = await fetch(`http://${HOST}:${PORT}/documents/deleteDocument`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Documento borrado correctamente:', responseData);
      return responseData;
    } else {
      console.error('Error al borrar el documento:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error al borrar el documento:', error);
    return null;
  }
};

  
  