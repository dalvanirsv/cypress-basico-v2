import cypress from "cypress"

describe('central de atendimento ao cliente TAT', function(){
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
        
        it('verifica o título da aplicação', function(){
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
})

