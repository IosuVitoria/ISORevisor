import React, { useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import SendEmail from './components/SendEmail/SendEmail';
import emailjs from 'emailjs-com';
import {
  ChakraProvider,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Center,
  Button,
} from '@chakra-ui/react';
import AddUser from './components/AddUser/AddUser';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { getAllUsers } from '../../api/users';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    total: 0,
    administrators: 0,
    responsables: 0,
    technicians: 0,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [AddUserModal, setAddUserModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getAllUsers();
        console.log('Usuarios recuperados', userResponse);
        setUsers(userResponse);
        setLoading(false); // Cambiamos loading a false después de recibir los datos
      } catch (error) {
        console.log('Error al obtener usuarios: ', error);
        setLoading(false); // En caso de error, también cambiamos loading a false
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    calculateSummary(users);
  }, [users]);

  const calculateSummary = (users) => {
    const total = users.length;
    const administrators = users.filter((user) => user.cargo === 'Administrador').length;
    const responsables = users.filter((user) => user.cargo === 'Responsable').length;
    const technicians = users.filter((user) => user.cargo === 'Técnico').length;

    setSummary({ total, administrators, responsables, technicians });
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
    setMessage('');
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const templateParams = {
      to_name: selectedUser.nombre,
      to_email: selectedUser.email,
      message,
    };

    emailjs
      .send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_USER_ID'
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Mensaje enviado correctamente');
        closeModal();
      })
      .catch((error) => {
        console.log('FAILED...', error);
        alert('Error al enviar el mensaje');
      });
  };

  const handleOpenAddUser = () => {
    setAddUserModal(true);
  };

  if (loading) {
    return <div>Cargando...</div>; // Muestra un indicador de carga mientras se obtienen los datos
  }

  return (
    <ChakraProvider>
      <Center w="100vw" h="100vh" padding={'10%'}>
        <Box
          w="100%"
          p={5}
          boxShadow="lg"
          borderRadius="lg"
          bg="gray.200"
          _hover={{ boxShadow: '2xl' }}
          sx={{
            boxShadow: '12px 12px 16px #bebebe, -12px -12px 16px #ffffff',
            borderRadius: '16px',
          }}
        >
          <div>
            <Text
              as="h3"
              textAlign="center"
              mb={8}
              textTransform={'uppercase'}
            >
              Tabla de Usuarios
            </Text>
            <Flex justifyContent={'space-around'}>
              <Button
                w={'250px'}
                marginBottom={'15px'}
                border={'2px solid black'}
                display={'flex'}
                justifyContent={'space-around'}
                onClick={handleOpenAddUser}
              >
                <PersonAddIcon />
                Agregar usuario
              </Button>
            </Flex>
          </div>
          <Flex justifyContent="space-around" mb={5} p={3} bg="gray.100" borderRadius="md" boxShadow="inner">
            <Text>Total Usuarios: {summary.total}</Text>
            <Text>Administradores: {summary.administrators}</Text>
            <Text>Responsables: {summary.responsables}</Text>
            <Text>Técnicos: {summary.technicians}</Text>
          </Flex>
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nombre</Th>
                <Th>Apellido</Th>
                <Th>Email</Th>
                <Th>Fecha Alta</Th>
                <Th>Cargo</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr
                  key={user.id}
                  _hover={{
                    boxShadow: '8px 8px 12px #bebebe, -8px -8px 12px #ffffff',
                    borderRadius: '8px',
                    background: 'gray.100'
                  }}
                >
                  <Td>{user.id}</Td>
                  <Td>{user.nombre}</Td>
                  <Td>{user.apellido}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.fechaAlta}</Td>
                  <Td>{user.cargo}</Td>
                  <Td display={"flex"} justifyContent={"space-around"} alignItems={"center"}>
                    <FaEnvelope onClick={() => openModal(user)} style={{ cursor: 'pointer' }} />
                    <EditNoteIcon />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>
      <SendEmail
        isOpen={modalIsOpen}
        onClose={closeModal}
        user={selectedUser}
        message={message}
        setMessage={setMessage}
        handleSendEmail={handleSendEmail}
      />
      <AddUser
        isOpen={AddUserModal}
        onClose={() => {
          setAddUserModal(false);
        }}
      />
    </ChakraProvider>
  );
};

export default UserTable;
