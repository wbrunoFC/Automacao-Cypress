/// <reference types="Cypress" />

describe('Popup', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })
    it('Deve verificar se o popup foi invocado', () => {
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?')
        })
    })

    it('Deve verificar se o popup foi construido', () => {
        cy.window().then(win => {
            cy.stub(win, 'open').as('WinOpen')

        })
        cy.get('#buttonPopUp').click()
        cy.get('@WinOpen').should('be.called')
    });

    describe('Popup com links', () => {
        it.only('Checar url do popup', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('eq', 'https://wcaquino.me/cypress/frame.html')
        });

        it.only('Remover atributo da tag html', () => {
            cy.contains('Popup2')
                // Remove o atributo target
                .invoke('removeAttr', 'target')
                .click()
                
        });
    });
});