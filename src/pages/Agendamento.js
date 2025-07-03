import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Agendamento.css';

export default function Agendamento() {
  const [date, setDate] = useState(new Date());
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const horarios = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const navigate = useNavigate();

  const handleFinalizar = () => {
    navigate('/sucesso'); // Redireciona para a rota de sucesso
  };

  return (
    <div className="agendamento-container">
      <h1 className="titulo">Agende seu horário</h1>

      <div className="calendar-wrapper">
        <Calendar onChange={setDate} value={date} />
      </div>

      <h2 className="subtitulo">Horários disponíveis</h2>
      <div className="horarios-grid">
        {horarios.map((hora, index) => (
          <button
            key={index}
            className={`botao-horario ${horarioSelecionado === hora ? 'selecionado' : ''}`}
            onClick={() => setHorarioSelecionado(hora)}
          >
            {hora}
          </button>
        ))}
      </div>

      {horarioSelecionado && (
        <button className="finalizar-btn" onClick={handleFinalizar}>
          Finalizar Agendamento
        </button>
      )}
    </div>
  );
}
