import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h2>ISO 9001</h2>
      <p>
        La norma ISO 9001 establece los criterios para un sistema de gestión de la calidad y es la única norma en la familia que se puede certificar (aunque esto no sea un requisito).
        Esta norma se basa en una serie de principios de gestión de la calidad, incluyendo un fuerte enfoque en el cliente, la motivación e implicación de la alta dirección, el enfoque basado en procesos y la mejora continua.
      </p>
      <p>
        Para más información sobre cómo implementar un sistema de control documental conforme a ISO 9001, visita nuestra sección de <Link to="/controldocumental">Control Documental</Link>.
      </p>
    </div>
  )
}

export default Home