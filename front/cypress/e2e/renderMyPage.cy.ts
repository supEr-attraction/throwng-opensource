describe("Throwng", () => {

  beforeEach(() => {
    cy.viewport('iphone-8');
    cy.visit("http://localhost:5173");
    const jwtToken = Cypress.env('jwtToken');
    window.localStorage.setItem("jwt", jwtToken);
  });

  it("renderMyPage", () => {
   cy.get('[href="/user/mypage"]').click({force:true});
    cy.url().should('include', '/user/mypage');
    cy.get('.active').click();
    cy.get('.header-btn-div > :nth-child(1)').click();
    cy.get('.filter-div').click();
    cy.get('.filter-list > :nth-child(3)').click();
    cy.get('.filter-list > :nth-child(2)').click();
    cy.get('.filter-list > :nth-child(1)').click();
    cy.get('.filter-list > :nth-child(4)').click();
    cy.get('.background').click({force: true});
  });
});
