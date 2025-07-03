import React from 'react';
import './Sucesso.css';

export default function Sucesso() {
  return (
    <div className="sucesso-container">
      <div className="sucesso-card">
        <h1>Agendamento realizado com sucesso!</h1>
        <p>Seu horário foi reservado no Studio Camilly.</p>
        <a href="/" className="botao-voltar">Voltar para o início</a>
      </div>
    </div>
  );
}
