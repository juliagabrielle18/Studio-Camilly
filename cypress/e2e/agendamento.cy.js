describe('Teste de agendamento Studio Camilly', () => {
  it('faz um agendamento com sucesso', () => {
    cy.visit('https://studiocamilly-d2cb0.web.app');

    // Ir para o catálogo e clicar no botão "Agendar"
    cy.contains('Ver Catálogo').click(); // se tiver esse botão na home

    cy.get('.carousel-item').should('have.length.greaterThan', 0);
    cy.get('button.botao-agendar').first().scrollIntoView().click({ force: true });


    // Verifica se está na tela de agendamento
    cy.contains('Escolha sua data e horário').should('be.visible');

    // Seleciona o primeiro dia disponível
    cy.get('.dia:not(.indisponivel)').first().click();

    // Seleciona o primeiro horário disponível
    cy.get('.botao-horario').first().click();

    // Preenche nome e telefone
    cy.get('input[placeholder="Digite seu nome"]').type('Teste Usuário');
    cy.get('input[placeholder="Digite seu telefone"]').type('11999999999');

    // Clica para confirmar
    cy.contains('Confirmar Agendamento').click();

    // Verifica se redirecionou para página de sucesso
    cy.url().should('include', '/sucesso');
    cy.contains('Voltar para o início').should('be.visible'); 
  });
});
