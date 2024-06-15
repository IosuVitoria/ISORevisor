import  { useState } from 'react';
import emailjs from 'emailjs-com';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [language, setLanguage] = useState('es'); // Default language: Spanish

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formData,
      'YOUR_USER_ID'
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Mensaje enviado correctamente');
    }).catch((error) => {
      console.log('FAILED...', error);
      alert('Error al enviar el mensaje');
    });
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const labels = {
    es: { name: 'Nombre', email: 'Correo Electrónico', message: 'Mensaje', submit: 'Enviar', language: 'Idioma' },
    en: { name: 'Name', email: 'Email', message: 'Message', submit: 'Send', language: 'Language' },
    eu: { name: 'Izena', email: 'Posta Elektronikoa', message: 'Mezua', submit: 'Bidali', language: 'Hizkuntza' }
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>{labels[language].submit}</h2>
        <div className="form-group">
          <label>{labels[language].name}</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>{labels[language].email}</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>{labels[language].message}</label>
          <textarea name="message" value={formData.message} onChange={handleInputChange} required></textarea>
        </div>
        <div className="form-group">
          <button type="submit">{labels[language].submit}</button>
        </div>
      </form>
      <div className="language-selector">
        <label>{labels[language].language}</label>
        <select value={language} onChange={handleLanguageChange}>
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="eu">Euskara</option>
        </select>
      </div>
    </div>
  );
};

export default Contact;
