/// <reference types="Cypress" />

describe('Testes de API', () => {
    let token

    before(() => {
        cy.getToken()
            .then(t => {
                token = t
            })
    })

    beforeEach(() => {
        cy.resetRest()
    });

    it('Criar conta vai rest', () => {
        cy.request({
            // So funciona uma vez pq a conta ja foi criada com este nome
            url: '/contas',
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                nome: "Conta via rest"
            }
        }).as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.eq(201)
            expect(res.body).to.have.property('id')
        })
    })

    it('Alterar conta', () => {
        cy.request({
            url: '/contas',
            method: 'GET',
            headers: {
                Authorization: `JWT ${token}`
            },
            queryString: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                url: `/contas/${res.body[0].id}`,
                method: 'PUT',
                headers: {
                    Authorization: `JWT ${token}`
                },
                body: {
                    nome: "Conta via rest alterada AQUIII"
                }
            }).as('response')
            cy.get('@response').its('status').should('be.eq', 200)
        })
    })

    it('Criar conta conta já existente', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                nome: "Conta mesmo nome"
            },

            failOnStatusCode: false
        }).as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.eq(400)
            expect(res.body.error).to.be.eq('Já existe uma conta com esse nome!')
        })
    });

    it('Criar transação', () => {
        cy.getContaByName('Conta para movimentacoes').then(conta => {
            cy.request({
                url: '/transacoes',
                method: 'POST',
                headers: {
                    Authorization: `JWT ${token}`
                },
                body: {
                    conta_id: conta,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "TESTE",
                    envolvido: "interessado",
                    status: true,
                    tipo: "REC",
                    valor: "123",
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.eq', 201)
    });

    it('Verificar saldo', () => {
        cy.request({
            url: '/saldo',
            method: 'GET',
            headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.eq('534.00')
        })

        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${token}` },
            queryString: {
                descricao: 'Movimentacao 1, calculo saldo'
            }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true,
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.eq', 200)
        })
    });

    it.only('Remover movimentação', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${token}` },
            queryString: {
                descricao: 'Movimentacao para exclusao'
            }
        }).then(res => {
            cy.request({
                method: 'DELETE',
                url: `/transacoes/${res.body[0].id}`,
                headers: { Authorization: `JWT ${token}` },
            }).its('status').should('be.eq', 204)
        })
    });
});