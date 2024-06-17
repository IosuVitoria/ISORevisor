import { HOST, PORT } from "../config";

export const addUser = async (newUser) => {
  try {
    const response = await fetch(`http://${HOST}:${PORT}/users/addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newUser })
    });

    if (!response.ok) {
      throw new Error('Error al insertar el usuario.');
    }

    const responseData = await response.json();
    console.log('Respuesta del servidor:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
    throw error;
  }
};


export const getAllUsers = async () => {
    try {
      const response = await fetch(`http://${HOST}:${PORT}/users/getAllUsers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
      } else {
        console.error('Error al recuperar usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al recuperar usuarios:', error);
    }
};