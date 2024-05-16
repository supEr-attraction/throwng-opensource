describe("Throwng", () => {

  beforeEach(() => {
    cy.viewport('iphone-8');
    cy.visit("http://localhost:5173");
    const jwtToken = Cypress.env('jwtToken');
    window.localStorage.setItem("jwt", jwtToken);
  });

  it("renderMyPageMenu", () => {
    cy.get('[href="/user/mypage"]').click({force:true});
    cy.url().should('include', '/user/mypage');
  });
});
