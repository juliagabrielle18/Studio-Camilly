import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp, getDoc, doc } from 'firebase/firestore';
import { db } from '../Backend/firebase';
import { enviarEmailParaCamilly } from '../Email';  // Importa a função de envio de email
import './Agendamento.css';

export default function Agendamento() {
  const [disponibilidades, setDisponibilidades] = useState({});
  const [diasSemana, setDiasSemana] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [nomeCliente, setNomeCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // Mostrar apenas os próximos 7 dias (incluindo hoje)
    const proximosSeteDias = Array.from({ length: 7 }, (_, i) => {
      const dia = new Date(hoje);
      dia.setDate(hoje.getDate() + i);
      return dia;
    });
    setDiasSemana(proximosSeteDias);

    const carregarDisponibilidades = async () => {
      try {
        const docRef = doc(db, 'configuracoes', 'disponibilidadesSemana');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDisponibilidades(docSnap.data());
        } else {
          console.warn('Documento de disponibilidade não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao carregar disponibilidades:', error);
      }
    };

    carregarDisponibilidades();
  }, []);

  const horariosDoDia = selectedDay
    ? disponibilidades[selectedDay.toISOString().split('T')[0]] || []
    : [];

  const handleFinalizar = async () => {
    if (selectedDay && selectedTime && nomeCliente.trim() && telefoneCliente.trim()) {
      const agendamento = {
        cliente: nomeCliente,
        telefone: telefoneCliente,
        data: selectedDay.toLocaleDateString('pt-BR'),
        horario: selectedTime,
        imagem: localStorage.getItem('imagemUnhaSelecionada'),
        novo: true,
        criadoEm: Timestamp.now(),
      };

      try {
        // Salvar no Firestore
        await addDoc(collection(db, 'agendamentos'), agendamento);

        // Enviar email para a Camilly
        await enviarEmailParaCamilly(agendamento);

        // Navegar para página de sucesso
        navigate('/sucesso');
      } catch (error) {
        console.error('Erro ao salvar agendamento ou enviar email:', error);
        alert('Erro ao agendar. Tente novamente.');
      }
    }
  };

  return (
    <div className="agendamento-novo-container">
      <button onClick={() => navigate('/catalogo')} className="seta-voltar">
        ←
      </button>

      <h1 className="titulo">Escolha sua data e horário</h1>

      <div className="dias-horizontal">
        {diasSemana.map((data, index) => {
          const dataStr = data.toISOString().split('T')[0];
          const horariosDia = disponibilidades[dataStr] || [];
          const estaDisponivel = horariosDia.length > 0;

          return (
            <div
              key={index}
              className={`dia ${selectedDay?.toDateString() === data.toDateString() ? 'ativo' : ''} ${
                !estaDisponivel ? 'indisponivel' : ''
              }`}
              onClick={() => estaDisponivel && setSelectedDay(data)}
            >
              <span className="semana">{data.toLocaleDateString('pt-BR', { weekday: 'short' })}</span>
              <span className="data">{data.getDate()}</span>
            </div>
          );
        })}
      </div>

      <h2 className="subtitulo">Horários disponíveis</h2>
      <div className="horarios-wrapper">
        {horariosDoDia.length > 0 ? (
          horariosDoDia.map((hora, i) => (
            <button
              key={i}
              className={`botao-horario ${selectedTime === hora ? 'selecionado' : ''}`}
              onClick={() => setSelectedTime(hora)}
            >
              {hora}
            </button>
          ))
        ) : (
          <p className="nenhum-horario">Nenhum horário disponível</p>
        )}
      </div>

      <h2 className="subtitulo">Seus dados</h2>
      <div className="inputs-linha">
        <input
          type="text"
          className="input-campo"
          placeholder="Digite seu nome"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
        />
        <input
          type="tel"
          className="input-campo"
          placeholder="Digite seu telefone"
          value={telefoneCliente}
          onChange={(e) => setTelefoneCliente(e.target.value)}
        />
      </div>

      <div className="botao-wrapper">
        {selectedTime && selectedDay && nomeCliente.trim() && telefoneCliente.trim() && (
          <button className="btn-book" onClick={handleFinalizar}>
            Confirmar Agendamento
          </button>
        )}
      </div>
    </div>
  );
}
