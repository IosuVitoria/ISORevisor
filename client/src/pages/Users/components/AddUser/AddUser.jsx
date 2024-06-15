import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { addUser } from '../../../../api/users';

const AddUser = ({ isOpen, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [fechaAlta, setFechaAlta] = useState('');
  const [cargo, setCargo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      nombre,
      apellido,
      email,
      fechaAlta,
      cargo,
    };

    console.log(newUser);

    try {
      const addUserResponse = await addUser(newUser);
    
      setNombre('');
      setApellido('');
      setEmail('');
      setFechaAlta('');
      setCargo('');
      onClose();
    } catch (error) {
      console.error("Error: ", error);
    }

    
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Añadir Nuevo Usuario</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl isRequired mb={3}>
              <FormLabel>Nombre</FormLabel>
              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
              />
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Apellido</FormLabel>
              <Input
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Apellido"
              />
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Fecha Alta</FormLabel>
              <Input
                type="date"
                value={fechaAlta}
                onChange={(e) => setFechaAlta(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Cargo</FormLabel>
              <Select
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="Selecciona el cargo"
              >
                <option value="Administrador">Administrador</option>
                <option value="Responsable">Responsable</option>
                <option value="Técnico">Técnico</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit" mr={3}>
              Añadir
            </Button>
            <Button variant="ghost" onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddUser;
