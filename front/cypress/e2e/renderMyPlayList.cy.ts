describe("Throwng", () => {

  beforeEach(() => {
    cy.viewport('iphone-8');
    cy.visit("http://localhost:5173");
    const jwtToken = Cypress.env('jwtToken');
    window.localStorage.setItem("jwt", jwtToken);
  });

  it("renderMyPlayList", () => {
    cy.get('[href="/user/playlist"]').click({force:true});
    cy.url().should('include', '/user/playlist');
    cy.get('.body').scrollTo('bottom');
  });
});
