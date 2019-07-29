/// <reference types="Cypress" />

context('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should have title', () => {
    cy.get('ion-title').should('contain', 'Login');
  });

  it('should have email sign in button', () => {
    cy.loginWithEmail();
    cy.url().should('eq', 'http://localhost:8100/home');
  });
});
