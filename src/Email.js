import emailjs from 'emailjs-com';

export function enviarEmailParaCamilly(agendamento) {
  const templateParams = {
    nome: agendamento.cliente,
    data: agendamento.data,
    horario: agendamento.horario,
  };

  return emailjs.send(
    'service_imxx6rx',       // Seu Service ID
    'template_dbjktmh',      // Seu Template ID
    templateParams,
    '-2sHay09VTxCSZaGM'      // Sua Public Key (User ID)
  );
}
