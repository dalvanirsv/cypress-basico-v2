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
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com  formação',function(){
        cy.get('#firstName').type('dalvanir')
        cy.get('#lastName').type('vieira')
        cy.get('#email').type('dalvanir@dalvanir')
        cy.get('#open-text-area').type('test')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
        .type('fsdkfmkdsf')
        .should('have.value','')
    })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('dalvanir')
        cy.get('#lastName').type('vieira')
        cy.get('#email').type('dalvanir@dalvanir.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('test')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
})
