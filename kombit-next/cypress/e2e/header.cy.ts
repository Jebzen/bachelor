describe("Test Header links", () => {
	it("Check each header element link", () => {
		return;
		cy.visit("http://localhost:3000");

		cy.wait(1000);

		cy.get(".navbar-nav")
			.children()
			.should("have.length", 5)
			.first()
			.contains("Infoside");

		cy.get(".navbar-nav")
			.children()
			.each((element, index, list) => {
				cy.wrap(element)
					.get("a.nav-link")
					.invoke("attr", "href")
					.then((href) => {
						cy.request(href).its("status").should("eq", 200);
					});
			});
	});

	it("Check first link", () => {
		return;
		let slug: any | undefined = "";
		cy.visit("http://localhost:3000");

		cy.wait(1000);

		cy.get(".navbar-nav")
			.get("a.nav-link")
			.first()
			.then((link) => {
				cy.wrap(link)
					.invoke("attr", "href")
					.then((href) => {
						slug = href;

						cy.log(slug);

						cy.visit("http://localhost:3000" + slug);

						cy.wait(1000);

						cy.url().should("include", slug);
					});
			});
	});

	it("Check climate friendly", () => {
		return;
		cy.visit("http://localhost:3000");

		cy.wait(1000);

		cy.get(".form-switch").get("input.form-check-input").click();

		cy.wait(1000);

		cy.url().should("eq", "http://localhost:3000/");

		cy.get(".form-switch").get("input.form-check-input").should("be.checked");

		cy.get(".carousel-inner")
			.first()
			.then((item) => {
				cy.wrap(item)
					.get(".bannerCaptionBox")
					.should("have.css", "background-color", "rgb(67, 67, 66)");
			});
	});

	it("Check search bar", () => {
		cy.visit("http://localhost:3000");

		cy.wait(1000);

		cy.get("#SearchInput").type("kombit");

		cy.get("#SearchButton").click();

		cy.wait(1000);

		cy.url().should("eq", "http://localhost:3000/soeg?term=kombit");
	});
});
