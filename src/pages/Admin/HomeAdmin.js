import React from 'react';
import { Link } from 'react-router-dom';
import './HomeAdmin.css';

export default function HomeAdmin() {
  return (
    <div className="home-container">
      <div className="text-section">
        <h1 className="studio-title">Painel da</h1>
        <h1 className="studio-title">Camilly</h1>
        <p className="subtitle">Gerencie seus agendamentos e horários disponíveis.</p>
        <div className="home-buttons">
          <Link to="/admin/agenda" className="home-btn filled">Agenda</Link>
          <Link to="/admin/disponibilidade" className="home-btn outlined">Disponibilidade</Link>
        </div>
      </div>

      <div className="image-section">
        <img src="/img/Studio-rosa.png" alt="Painel da Camilly" />
      </div>
    </div>
  );
}
