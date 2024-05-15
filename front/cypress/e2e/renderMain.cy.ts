describe("Throwng", () => {

  beforeEach(() => {
    cy.viewport('iphone-8');
    cy.visit("http://localhost:5173");
    const jwtToken = Cypress.env('jwtToken');
    window.localStorage.setItem("jwt", jwtToken);
  });

  it("render Main Page and scroll", () => {
    cy.get('.active').should('have.text','홈');
    cy.get('[href="/user/playlist"]').should('have.text','플레이리스트');
    cy.get('[href="/content"]').should('have.text','컨텐츠');
    cy.get('[href="/user/mypage"]').should('have.text','마이');
  });
});
