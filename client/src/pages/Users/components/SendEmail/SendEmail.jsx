import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Textarea } from '@chakra-ui/react';

const SendEmail = ({ isOpen, onClose, user, message, setMessage, handleSendEmail }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enviar Correo a {user?.nombre}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSendEmail}>
          <ModalBody>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí"
              required
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit" mr={3}>
              Enviar
            </Button>
            <Button variant="ghost" onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default SendEmail;
