
describe('central de Atendimento ao Cliente TAT', function(){
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
        
        it('verifica o título da aplicação', function(){
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preencha os campos obrigatórios e envia o formulário', function(){
        const longTest = 'teste, teste, teste, teste, teste, teste,teste, teste, teste,teste, teste, teste,teste, teste, teste'
        cy.get('#firstName').type('dalvanir')
        cy.get('#lastName').type('vieira')
        cy.get('#email').type('dalvanir@dalvanir.com')
        cy.get('#open-text-area').type(longTest, { delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com  formação',function(){
        cy.get('#firstName').type('dalvanir')
        cy.get('#lastName').type('vieira')
        cy.get('#email').type('dalvanir@dalvanir')
        cy.get('#open-text-area').type('test')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
        .type('fsdkfmkdsf')
        .should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('dalvanir')
        cy.get('#lastName').type('vieira')
        cy.get('#email').type('dalvanir@dalvanir.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('test')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preencha e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .type('dalvanir')
        .should('have.value', 'dalvanir')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('vieira')
        .should('have.value', 'vieira')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('dalvanir@dalvanir.com')
        .should('have.value', 'dalvanir@dalvanir.com')
        .clear()
        .should('have.value', '')
        cy.get('#open-text-area')
        .type('teste')
        .should('have.value', 'teste')
        .clear()
        .should('have.value', '')

    })

    it('validar mensagem de erro ao não digitar os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    })   

    it('envia um formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })   
})
