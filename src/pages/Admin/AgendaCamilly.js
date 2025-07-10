import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Backend/firebase';
import { ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import './AgendaCamilly.css';

export default function AgendaCamilly() {
  const [agendamentos, setAgendamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarAgendamentos() {
      try {
        const snapshot = await getDocs(collection(db, 'agendamentos'));
        const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAgendamentos(lista);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    }

    carregarAgendamentos();
  }, []);

  const marcarComoLido = async (id) => {
    try {
      const agendamentoRef = doc(db, 'agendamentos', id);
      await updateDoc(agendamentoRef, { novo: false });
      setAgendamentos((prev) =>
        prev.map((ag) => (ag.id === id ? { ...ag, novo: false } : ag))
      );
    } catch (error) {
      console.error('Erro ao marcar como lido:', error);
    }
  };

  const apagarAgendamento = (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá recuperar este agendamento depois!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c59c8f',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, 'agendamentos', id));
          setAgendamentos((prev) => prev.filter((ag) => ag.id !== id));

          Swal.fire({
            title: 'Apagado!',
            text: 'O agendamento foi removido.',
            icon: 'success',
            confirmButtonColor: '#c59c8f',
          });
        } catch (error) {
          console.error('Erro ao apagar agendamento:', error);
          Swal.fire({
            title: 'Erro',
            text: 'Não foi possível apagar o agendamento.',
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <div className="agenda-admin-container">
      <button className="voltar-btn" onClick={() => navigate('/admin')}>
        <ArrowLeft size={24} />
      </button>

      <h1 className="titulo-admin">Olá, Camilly</h1>
      <div className="cards-agenda">
        {agendamentos.length === 0 ? (
          <p>Nenhum agendamento ainda.</p>
        ) : (
          agendamentos.map((ag) => (
            <div key={ag.id} className="card-agendamento">
              {ag.novo && <span className="selo-novo">Novo!</span>}
              <img src={ag.imagem} alt="Unha escolhida" />
              <h3>{ag.cliente}</h3>
              <p><strong>Telefone:</strong> {ag.telefone}</p>
              <p><strong>Data:</strong> {ag.data}</p>
              <p><strong>Horário:</strong> {ag.horario}</p>

              {ag.novo && (
                <button className="botao-lido" onClick={() => marcarComoLido(ag.id)}>
                  Marcar como lido
                </button>
              )}

              <button className="botao-apagar" onClick={() => apagarAgendamento(ag.id)}>
                Apagar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
