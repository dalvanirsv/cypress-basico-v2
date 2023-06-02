Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('dalvanir')
        cy.get('#lastName').type('vieira')
        cy.get('#email').type('dalvanir@dalvanir.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        

})