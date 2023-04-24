describe('Main Display', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'orders.json'
    })
    cy.visit('http://localhost:3000')

  })

  it('Should display the site title, order form, and orders elements on the page', () => {
    cy.get('h1').should('be.visible').contains('Burrito Builder')
    cy.get('.App').should('be.visible')
    cy.get('form').should('be.visible')
    cy.get('section').should('be.visible')
  })

  it('Should display all current orders on page load. Each should display the name and ingredients list for that order.', () => {
    cy.get('section').children().should('have.length', 2)

    cy.get('section > :nth-child(1)').should('be.visible')
    cy.get(':nth-child(1) > h3').should('be.visible').contains('Heather')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').should('be.visible').contains('carnitas')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(2)').should('be.visible').contains('pico de gallo')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(3)').should('be.visible').contains('sour cream')

    cy.get('section > :nth-child(2)').should('be.visible')
    cy.get(':nth-child(2) > h3').should('be.visible').contains('Nik')
    cy.get(':nth-child(2) > .ingredient-list > :nth-child(1)').should('be.visible').contains('beans')
    cy.get(':nth-child(2) > .ingredient-list > :nth-child(2)').should('be.visible').contains('jalapenos')
    cy.get(':nth-child(2) > .ingredient-list > :nth-child(3)').should('be.visible').contains('queso fresco')

  })
})