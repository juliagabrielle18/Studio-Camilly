// src/Backend/agendamentoService.js
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase'; // correto se está na mesma pasta Backend



export async function salvarAgendamento(agendamento) {
  try {
    await addDoc(collection(db, 'agendamentos'), {
      ...agendamento,
      criadoEm: Timestamp.now()
    });
  } catch (error) {
    console.error('Erro ao salvar no Firestore:', error);
    throw error;
  }
}
