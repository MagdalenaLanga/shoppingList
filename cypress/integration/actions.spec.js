/// <reference types="cypress" />

describe("test dodaj przepis", () => {
    beforeEach(()=>{
        cy.visit("http://localhost:1234/");
        cy.get('[data-show="recipe-input"]').click();
    })

    it('should add recipe name', () => {
        cy.get('.recipe-name').click().type('Makaron po bolońsku');
        cy.contains('Dodaj składnik').click();

        cy.get('.recipe-name').should('have.value', 'Makaron po bolońsku');
        cy.get('.ing-inputs').should('have.length', 1);
    })
})