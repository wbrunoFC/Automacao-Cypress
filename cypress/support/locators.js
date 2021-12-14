const locators = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BUTTON_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS: '[data-test="menu-settings"]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]'
    },
    CONTAS: {
        NOME: '[data-test="nome"]',
        ICON_EDIT: nome => `//td[contains(., '${nome}')]/../td[2]/i[1]`,
        ICON_DELETE: nome => `//td[contains(., '${nome}')]/../td[2]/i[2]`,
        BTN_SALVAR: '.btn'
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test="descricao"]',
        VALOR: '[data-test="valor"]',
        INTERESSADO: '[data-test="envolvido"]',
        BTN_SALVAR: '.btn-primary'
    }
}

export default locators