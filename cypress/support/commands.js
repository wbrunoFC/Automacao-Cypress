import loc from './locators'
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
    cy.get(loc.LOGIN.USER).as('Input user').type('wbruno.costa@gmail.com')
    cy.get(loc.LOGIN.PASSWORD).as('Input password').type('123456')
    cy.get(loc.LOGIN.BUTTON_LOGIN).as('Entrar').click()
})

Cypress.Commands.add('getToken', () => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: "wbruno.costa@gmail.com",
            redirecionar: false,
            senha: "123456"
        }
    }).its('body.token').should('not.be.empty')
        .then(token => {return token })
})

Cypress.Commands.add('resetRest', () => {
    cy.getToken().then(token => {
        cy.request({
            method: 'GET',
            url: '/reset',
            headers: {Authorization: `JWT ${token}`}
        }).its('status').should('be.eq', 200)
    })
})

Cypress.Commands.add('getContaByName', nome => {
    cy.getToken().then(token => {
        cy.request({
            url: '/contas',
            method: 'GET',
            headers: {
                Authorization: `JWT ${token}`
            },
            queryString: {
                nome: nome
            }
        }).then(response => {
            return response.body[0].id
        })
    })
})