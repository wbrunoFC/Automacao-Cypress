/// <reference types="Cypress" />

describe('Usando Fixtures', () => {

    // Nesse contexto so funciona com "function"
    it('Cadastrar usuario', function() {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.fixture('userData').as('user').then(() => {
            cy.get('#formNome').type(this.user.nome)
            cy.get('[data-cy="dataSobrenome"]').type(this.user.sobreNome)
            cy.get(`[name=formSexo][value=${this.user.sexo}]`).click()
            cy.get(`[name=formComidaFavorita][value=${this.user.comida}]`).click()
            cy.get('[data-test="dataEscolaridade"]').select(this.user.escolaridade)
            cy.get('#formEsportes').select(this.user.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('be.visible')
        })
    });
});