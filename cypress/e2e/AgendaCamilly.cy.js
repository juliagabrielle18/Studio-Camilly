describe('Tela administrativa AgendaCamilly', () => {
  it('deve carregar os agendamentos e exibir o título Olá, Camilly', () => {
    // Acesse a rota da AgendaCamilly
    cy.visit('https://studiocamilly-d2cb0.web.app/admin/agenda');

    // Verifica se o título aparece
    cy.contains('Olá, Camilly').should('be.visible');

    // Verifica se há cards de agendamento (pelo menos um)
    cy.get('.card-agendamento').should('exist');

    // Se existir algum selo "Novo!", ele deve estar visível
    cy.get('.selo-novo').should('exist');

    // Verifica se o botão "Marcar como lido" existe quando tem agendamento novo
    cy.get('.botao-lido').should('exist');

    // Verifica se o botão "Apagar" está disponível
    cy.get('.botao-apagar').should('exist');
  });
});
