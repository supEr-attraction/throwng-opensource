describe("Throwng", () => {

  beforeEach(() => {
    cy.viewport('iphone-8');
    cy.visit("http://localhost:5173");
    const jwtToken = Cypress.env('jwtToken');
    window.localStorage.setItem("jwt", jwtToken);
  });

  it("renderContent", () => {
    cy.get('[href="/content"]').click({force:true});
    cy.url().should('include', '/content');
    cy.get('.quiz-border').click();
    cy.get('.Header svg').click({force:true});
  });
});
