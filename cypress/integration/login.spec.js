/// <reference types="Cypress" />

context('Login Page', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should have title', () => {
        cy.get('ion-title').should('contain', 'Login');
    });

    it('should have Google sign in button', () => {
        let googleSignInButton = cy.get('.firebaseui-idp-google');
        googleSignInButton.should('contain', 'Sign in with Google');
        googleSignInButton.click();
    });

    it('should have email sign in button', () => {
        let emailSignInButton = cy.get('.firebaseui-idp-password');
        emailSignInButton.should('contain', 'Sign in with email');
        emailSignInButton.click();

        cy.get('.firebaseui-id-email').type(Cypress.config('user'));
        cy.get('.firebaseui-id-submit').click();
        cy.get('.firebaseui-id-password').type(Cypress.config('pass'));
        cy.get('.firebaseui-id-submit').click();

        cy.url().should('eq', 'http://localhost:8100/home');
    });

    it('should have anonymous sign in button', () => {
        let continueAsGuestButton = cy.get('.firebaseui-idp-anonymous');
        continueAsGuestButton.should('contain', 'Continue as guest');
        continueAsGuestButton.click();

        cy.url().should('eq', 'http://localhost:8100/home');
    });
});
