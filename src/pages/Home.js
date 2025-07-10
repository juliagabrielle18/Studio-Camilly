import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="text-section">
        <h1 className="studio-title">Studio Camilly</h1>
        <h1 className="studio-title">Cavalcante</h1>
        <p className="subtitle">Sua beleza começa nas pontas dos dedos.</p>
        <div className="home-buttons">
          <Link to="/catalogo" className="home-btn filled">Ver Catálogo</Link>
          <a
            href="https://wa.me/5561981332438"
            className="home-btn outlined"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contato
          </a>
        </div>
      </div>

      <div className="image-section">
        <img src="/img/Studio-rosa.png" alt="Studio Camilly" />
      </div>
    </div>
  );
}

