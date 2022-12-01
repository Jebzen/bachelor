const pages = [
	"/infoside",
	"/landingpage",
	"/kalender",
	"/nyheder",
	"/projekt",
	"/soeg",
	"/kontakt",
];

describe("Testing pages", () => {
	it("Check each type of page", () => {
		return;
		cy.visit("/");

		cy.wait(1000);

		pages.forEach((page) => {
			cy.request(page).its("status").should("eq", 200);
		});
	});

	it("Vist each type of page", () => {
		return;
		cy.visit("/");

		cy.wait(1000);

		pages.forEach((page) => {
			cy.visit(page);

			cy.wait(1000);
		});
	});

	it("Vist a slug of each page [Info]", () => {
		return;
		let title = "";

		cy.visit("/infoside");

		cy.wait(1000);

		cy.get(".info-box .news-item")
			.first()
			.then((element) => {
				cy.wrap(element)
					.find("h2")
					.then((h2) => {
						title = h2.text();

						cy.wrap(element).find("small.fst-italic").should("exist");
						cy.wrap(element).find("p").should("exist");

						cy.wrap(element).click();
						cy.wait(1000);

						cy.get("h1").should("contain", title);

						cy.get(".shareButtons").children().should("have.length", 3);

						cy.get(".SoMeFeed")
							.find(".col-4")
							.each((element, index, list) => {
								if (index < 3) {
									cy.wrap(element).click().should("have.class", "bg-info");
								}
							});
					});
			});
	});

	it("Vist a slug of each page [Landing page]", () => {
		let title = "";

		cy.visit("/landingpage");

		cy.wait(1000);

		cy.get(".landing-box .news-item")
			.first()
			.then((element) => {
				cy.wrap(element)
					.find("h2")
					.then((h2) => {
						title = h2.text();

						cy.wrap(element).find("small.fst-italic").should("exist");
						cy.wrap(element).find("p").should("exist");

						cy.wrap(element).click();
						cy.wait(1000);

						cy.get("h1").should("contain", title);

						cy.get(".shareButtons").children().should("have.length", 3);

						cy.get(".projekt-area")
							.find(".col-2")
							.each((element, index, list) => {
								let subtitle = "";
								cy.wrap(element).should(
									"have.attr",
									"data-id",
									index.toString()
								);

								cy.wrap(element)
									.find("p")
									.then((p) => {
										subtitle = p.text();

										cy.wrap(element).click();

										cy.get(".open-projekt-box")
											.find("h3")
											.should("contain", subtitle);
									});
							});

						cy.get(".forretningschef").then((element) => {
							cy.wrap(element).find("h4").should("exist");
							cy.wrap(element).find("img").should("exist");
							cy.wrap(element)
								.find("p")
								.each((p, i) => {
									if (i == 1) {
										cy.wrap(p).should("have.class", "respect-line");
									}
								});
						});
					});
			});
	});
});
