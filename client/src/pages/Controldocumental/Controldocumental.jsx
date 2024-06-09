import { useState } from 'react';
import './Controldocumental.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DocumentModal from './components/Documento/Documento';
import Historial from './components/Historial/Historial';


const ControlDocumental = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [isHistorialOpen, setIsHistorialOpen] = useState(false)
  

    const handleOpenModal = (section) => {
        setSelectedSection(section);
        setIsModalOpen(true);
    };

    const handleOpenHistorial = async (section) => {
        try {
            setSelectedSection(section);
            setIsHistorialOpen(true);
            
          } catch (error) {
            console.error('Error al obtener los documentos:', error);
          }
       
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSection(null);
    };

    const sections = [
        { number: 1, title: "Alcance", description: "Define el alcance del sistema de gestión de calidad." },
        { number: 2, title: "Referencias Normativas", description: "Documentos normativos que son indispensables para la aplicación de la norma." },
        { number: 3, title: "Términos y Definiciones", description: "Define los términos utilizados en la norma." },
        { number: 4, title: "Contexto de la Organización", description: "Comprender la organización y su contexto, así como las necesidades y expectativas de las partes interesadas." },
        { number: 5, title: "Liderazgo", description: "Requisitos para la alta dirección, incluyendo el liderazgo y el compromiso." },
        { number: 6, title: "Planificación", description: "Requisitos para abordar riesgos y oportunidades, y establecer objetivos de calidad." },
        { number: 7, title: "Soporte", description: "Recursos necesarios para el sistema de gestión de calidad, incluyendo competencia, concienciación y comunicación." },
        { number: 8, title: "Operación", description: "Planificación y control operacional para cumplir con los requisitos de productos y servicios." },
        { number: 9, title: "Evaluación del Desempeño", description: "Monitoreo, medición, análisis y evaluación del desempeño del sistema de gestión de calidad." },
        { number: 10, title: "Mejora", description: "Requisitos para la mejora continua del sistema de gestión de calidad." }
    ];

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="control-documental-container">
                <div className="control-documental-content">
                    <h2>Control Documental</h2>
                    <p>
                        Aquí puedes describir el sistema de control documental en detalle.
                    </p>
                    <h3>Puntos Principales de la Norma ISO 9001</h3>
                    <table className="iso-table">
                        <thead>
                            <tr>
                                <th>Sección</th>
                                <th>Descripción</th>
                                <th>Procedimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.map(section => (
                                <tr key={section.number}>
                                    <td>{section.number}. {section.title}</td>
                                    <td>{section.description}</td>
                                    <td style={{ display: "flex", justifyContent: "space-around" }}>
                                        <CloudUploadIcon onClick={() => handleOpenModal(section.number)} />
                                        <VisibilityIcon onClick={() => handleOpenHistorial(section.number)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <DocumentModal isOpen={isModalOpen} onClose={handleCloseModal} section={selectedSection} />
                    <Historial isOpen={isHistorialOpen} onClose={() =>{setIsHistorialOpen(false)}} section={selectedSection}/>
                </div>
            </div>
        </div>
    );
};

export default ControlDocumental;


