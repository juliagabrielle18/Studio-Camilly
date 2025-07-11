import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../Backend/firebase';
import { ArrowLeft } from 'lucide-react';
import './Disponibilidade.css';

const horariosPorPeriodo = {
  manha: ['08:00', '09:00', '10:00', '11:00'],
  tarde: ['13:00', '14:00', '15:00', '16:00'],
  noite: ['17:00', '18:00', '19:00', '20:00'],
};

export default function Disponibilidade() {
  const [semana, setSemana] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [periodo, setPeriodo] = useState('manha');
  const [disponibilidades, setDisponibilidades] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const hoje = new Date();
    const novaSemana = Array.from({ length: 7 }, (_, i) => {
      const dia = new Date(hoje);
      dia.setDate(hoje.getDate() + i);
      return dia;
    });
    setSemana(novaSemana);

    // Carregar dados salvos do Firestore
    const carregarDisponibilidadesSalvas = async () => {
      try {
        const ref = doc(db, 'configuracoes', 'disponibilidadesSemana');
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setDisponibilidades(snap.data());
        }
      } catch (error) {
        console.error('Erro ao buscar disponibilidades:', error);
      }
    };

    carregarDisponibilidadesSalvas();
  }, []);

  const formatarData = (data) => data.toISOString().split('T')[0];

  const toggleHorario = (data, hora) => {
    const chave = formatarData(data);
    const horariosAtuais = disponibilidades[chave] || [];

    const atualizados = horariosAtuais.includes(hora)
      ? horariosAtuais.filter((h) => h !== hora)
      : [...horariosAtuais, hora];

    setDisponibilidades((prev) => ({ ...prev, [chave]: atualizados }));
  };

  const salvarDisponibilidades = async () => {
    try {
      await setDoc(doc(db, 'configuracoes', 'disponibilidadesSemana'), disponibilidades);
      alert('Disponibilidades salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar no Firestore:', error);
      alert('Erro ao salvar. Tente novamente.');
    }
  };

  return (
    <div className="disponibilidade-container">
      <button className="voltar-btn" onClick={() => navigate('/admin')}>
        <ArrowLeft size={24} />
      </button>

      <h1 className="titulo">Olá, Camilly</h1>
      <p className="subtitulo">Selecione os dias e horários disponíveis</p>

      <div className="dias-semana">
        {semana.map((data, index) => {
          const ativo = diaSelecionado && formatarData(diaSelecionado) === formatarData(data);
          return (
            <div
              key={index}
              className={`dia ${ativo ? 'ativo' : ''}`}
              onClick={() => setDiaSelecionado(data)}
            >
              <span className="semana">
                {data.toLocaleDateString('pt-BR', { weekday: 'short' })}
              </span>
              <span className="data">{data.getDate()}</span>
            </div>
          );
        })}
      </div>

      {diaSelecionado && (
        <>
          <div className="periodos">
            {Object.keys(horariosPorPeriodo).map((p) => (
              <button
                key={p}
                className={`periodo-btn ${periodo === p ? 'ativo' : ''}`}
                onClick={() => setPeriodo(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <div className="horarios-grid">
            {horariosPorPeriodo[periodo].map((hora) => {
              const chaveDia = formatarData(diaSelecionado);
              const selecionado = (disponibilidades[chaveDia] || []).includes(hora);
              return (
                <button
                  key={hora}
                  className={`botao-horario ${selecionado ? 'selecionado' : ''}`}
                  onClick={() => toggleHorario(diaSelecionado, hora)}
                >
                  {hora}
                  {selecionado && <span className="remover-horario">✖</span>}
                </button>
              );
            })}
          </div>
        </>
      )}

      <button className="btn-salvar" onClick={salvarDisponibilidades}>
        Salvar Disponibilidades
      </button>
    </div>
  );
}
