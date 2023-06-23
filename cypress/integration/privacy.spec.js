it.only('testa a pagina da política de privacidade de forma independente', function() {
    cy.visit('./src/privacy.html')

    cy.contains('Talking About Testing').should('be.visible')
      })

      it.only('testa a pagina da política de privacidade de forma independente', function() {
        cy.visit('./src/privacy.html')
    
        cy.contains('Talking About Testing').should('be.visible')
          })