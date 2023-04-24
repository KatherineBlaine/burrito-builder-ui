// USER FLOW #1 - As a user, I should be able to open the application and view all current orders on the main page.
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

describe('Burrito Order Form Functionality', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'orders.json'
    })
    cy.visit('http://localhost:3000')
  })

  // USER FLOW #2 - As a user, I should be able to add my name and select multiple ingredients. As I fill out my order, I should see an order summary live update

  it('Should track the values input by the user and update the name input field value, as well as display selected ingredients to the user.', () => {
    cy.get('p').should('be.visible').contains('Nothing selected')

    cy.get('input').should('be.visible').should('have.value', '')
    cy.get('input').type('Katherine')
    cy.get('input').should('have.value', 'Katherine')


    cy.get('[name="beans"]').click()
    cy.get('p').contains('beans')
    cy.get('[name="steak"]').click()
    cy.get('[name="guacamole"]').click()
    cy.get('p').contains('beans, steak, guacamole')
  })

  // USER FLOW #3 - As a user, I should be able to view my completed order along with other current orders when I click submit.

  it('Should display the new order created when the user clicks submit', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      fixture: 'order.json'
    })
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'postedOrders.json'
    })

    cy.get('input').type('Katherine')
    cy.get('[name="beans"]').click()
    cy.get('[name="steak"]').click()
    cy.get('[name="guacamole"]').click()
    cy.get(':nth-child(15)').should('be.visible').click()

    cy.get('section > :nth-child(3)').should('be.visible')
    cy.get(':nth-child(3) > h3').should('be.visible').contains('Katherine')
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(1)').should('be.visible').contains('beans')
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(2)').should('be.visible').contains('steak')
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(3)').should('be.visible').contains('guacamole')
  })

  // USER FLOW #4 - As a user, I should see an error message if I do not provide sufficient information to submit an order.

  it('Should only allow the user to submit an order if a name and at least one ingredient is selected', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      fixture: 'order.json'
    })
    cy.get(':nth-child(15)').click()
    cy.get(':nth-child(15)').should('be.visible').contains('Please enter your name and select at least one ingredient to submit your order!')

    cy.get('input').type('KB')
    cy.get(':nth-child(16)').click()
    cy.get(':nth-child(15)').should('be.visible').contains('Please enter your name and select at least one ingredient to submit your order!')
  })
})

describe('Error handling message', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 400,
    })
    cy.visit('http://localhost:3000')
  })

  it('Should display a server error message in the event of a failed network request', () => {
    cy.get('h3').should('be.visible').contains('Sorry, Server Error! Please try again.')
  })
})







