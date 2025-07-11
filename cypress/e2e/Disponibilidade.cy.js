describe('Tela administrativa de Disponibilidade', () => {
  it('acessa a tela, seleciona dia/horário, desmarca e salva', () => {
    // 1. Visita a URL da tela de disponibilidade
    cy.visit('https://studiocamilly-d2cb0.web.app/admin/disponibilidade');

    // 2. Verifica o título
    cy.contains('Olá, Camilly').should('be.visible');

    // 3. Seleciona o primeiro dia da semana
    cy.get('.dias-semana .dia').first().click();

    // 4. Clica no botão "Tarde" para mudar o período
    cy.contains('Tarde').click();

    // 5. Seleciona o primeiro horário disponível da tarde
    cy.get('.horarios-grid .botao-horario').first().as('primeiroHorario');
    cy.get('@primeiroHorario').click();

    // 6. Verifica se o botão ficou selecionado
    cy.get('@primeiroHorario').should('have.class', 'selecionado');

    // 7. Clica de novo no mesmo horário para desmarcar
    cy.get('@primeiroHorario').click();

    // 8. Verifica se o botão perdeu a classe 'selecionado' (ou seja, foi desmarcado)
    cy.get('@primeiroHorario').should('not.have.class', 'selecionado');

    // 9. Clica em "Salvar Disponibilidades"
    cy.contains('Salvar Disponibilidades').click();

    // 10. Aguarda e verifica se apareceu o alert de sucesso
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Disponibilidades salvas com sucesso');
    });
  });
});
