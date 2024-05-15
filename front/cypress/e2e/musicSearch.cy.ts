describe("Throwng", () => {

  beforeEach(() => {
    cy.viewport('iphone-8');
    cy.visit("http://localhost:5173");
    const jwtToken = Cypress.env('jwtToken');
    window.localStorage.setItem("jwt", jwtToken);
  });

  it("musicSearch", () => {
    cy.get('.circle').click({force:true});
    cy.url().should('include', '/music/search');
    cy.get('.input').type('박재범');
    cy.get('form').submit()
    cy.get('.searchResults > :nth-child(3)').click();
    cy.get('.input-area').type('Cypress TEST');
  });
});
