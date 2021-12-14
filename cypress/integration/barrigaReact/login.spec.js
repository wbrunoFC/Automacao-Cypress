/// <reference types="Cypress" />
import loc from '../../support/locators'

describe('Testes de funcionalidade', () => {
    beforeEach(() => {
        cy.visit('https://barrigareact.wcaquino.me').as('Produção');
        cy.login()
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        
    });
    it('CT01 Deve fazer login com sucesso', () => {
        cy.get('.toast-message').as('Mensagem de boas vindas').should('be.visible')

    });

    it.only('CT02 Deve adicionar conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.NOME).type('Conta 01')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get('.toast-success > .toast-message').should('be.visible')

    });

    it('CT03 Deve alterar conta', () => {
        cy.xpath(loc.CONTAS.ICON_EDIT('Conta 01')).click()
        cy.get(loc.CONTAS.NOME).clear().type('Conta 01 editada')
        cy.get(loc.CONTAS.BTN_SALVAR).as('Botão Salvar').click()
        cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso')
    });
    
    it.only('CT04 Deve excluir conta', () => {
        cy.xpath(loc.CONTAS.ICON_DELETE('Conta 01 editada')).click()
        cy.get('.toast-message').should('be.visible').click()
    });
});