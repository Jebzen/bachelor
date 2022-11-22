describe("Clicking in website", () => {
	it("passes", () => {
		cy.visit("http://localhost:3000");

		cy.get(".navbar-nav").contains("Nyheder").click();

		cy.url().should("include", "/nyheder");

		cy.get("#topBar")
			.get(".form-control")
			.type("Kombit")
			.should("have.value", "Kombit");
	});
});
