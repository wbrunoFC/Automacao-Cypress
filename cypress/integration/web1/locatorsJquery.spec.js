/// <reference types="Cypress" />

describe('Popup', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    it('Usando jquery selector', () => {
        // tr:eq(0) pea o primeiro elemento declarado 
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input').click();
        // * significa se contem o valor
        cy.get("[onclick*='Francisco']")
    });

    it.only('XPath', () => {
        cy.xpath('//input[contains(@onclick, \'Francisco\')]').should('be.exist')
        cy.xpath("//td[contains(.,'Usuario A')]/following-sibling::td[contains(.,'Mestrado')]/..//input[@type='text']").should('be.exist')
    });
})