describe('central de Atendimento ao Cliente TAT', function(){
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
        
        it('verifica o título da aplicação', function(){
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preencha os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('dalvanir')
        cy.get('#lastName').type('vieira')
        cy.get('#email').type('dalvanir@dalvanir')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click

    })
})

