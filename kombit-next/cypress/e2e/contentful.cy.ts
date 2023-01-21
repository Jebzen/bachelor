const pages = [
	"/infoside",
	"/landingpage",
	"/kalender",
	"/nyheder",
	"/projekt",
	"/soeg",
	"/kontakt",
];
import { faker } from "@faker-js/faker";

describe("Testing pages", () => {
	it("Check each type of page", () => {
		cy.visit("/");

		cy.wait(1000);

		pages.forEach((page) => {
			cy.request(page).its("status").should("eq", 200);
		});
	});

	it("Vist each type of page", () => {
		cy.visit("/");

		cy.wait(1000);

		pages.forEach((page) => {
			cy.visit(page);

			cy.wait(1000);
		});
	});

	it("Vist a slug of each page [Info]", () => {
		let title = "";

		cy.visit("/infoside");

		cy.wait(1000);

		cy.get(".info-box .news-item")
			.first()
			.then((element) => {
				cy.wrap(element)
					.find("h3")
					.then((h3) => {
						title = h3.text();

						cy.wrap(element).find(".related p").should("exist");

						cy.wrap(element).click();
						cy.wait(1000);

						cy.get("h1").should("contain", title);

						//cy.get(".shareButtons").children().should("have.length", 3);

						cy.get(".beskrivelse-news").should("exist");

						cy.get(".WPFeedHeader")
							.find(".col-4.newsHeader")
							.each((element, index, list) => {
								if (index < 3) {
									cy.wrap(element).click().should("have.class", "active");
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
					.find("h3")
					.then((h3) => {
						title = h3.text();

						cy.wrap(element).find("p.small").should("exist");

						cy.wrap(element).click();
						cy.wait(1000);
						//Inde på underside

						cy.get("h1").should("contain", title);

						//cy.get(".shareButtons").children().should("have.length", 3);

						cy.get(".news-related")
							.find("a.news-item")
							.each((element, index, list) => {
								cy.wrap(element).find("h3").should("exist");
								cy.wrap(element).find("p.small").should("exist");
								cy.wrap(element).find("img.newsImg").should("exist");
							});

						cy.get(".forretningschef").then((element) => {
							cy.wrap(element).find("h4").should("exist");
							cy.wrap(element).find("img").should("exist");
							cy.wrap(element).find("p").should("exist");
							cy.wrap(element).find("p.respect-line").should("exist");
						});

						//cy.get(".projektLanding").should("exist");

						cy.get(".CFFeedHeader")
							.find(".col-4.newsHeader")
							.each((element, index, list) => {
								if (index < 3) {
									cy.wrap(element).click().should("have.class", "activebox2");
								}
							});
					});
			});
	});

	it("Vist a slug of each page [Projekt side]", () => {
		let title = "";

		cy.visit("/projekt");

		cy.wait(1000);

		cy.get(".tabsContainer")
			.children()
			.each((element, index) => {
				cy.wrap(element).click().should("have.class", "activebox");
			});

		cy.get(".tabsContainer").children().first().click();

		cy.get(".Projekt_CardOverviewContaier__AflId .Projekt_cardBody__ByE6l")
			.first()
			.then((element) => {
				cy.wrap(element)
					.find("h3")
					.then((h3) => {
						title = h3.text();

						cy.wrap(element).find("img").should("exist");
						cy.wrap(element).find("p.text").should("exist");
						cy.wrap(element).find("a.read-more").should("exist");

						cy.wrap(element).find("a.read-more").click();
						cy.wait(1000);
						//Inde på underside

						cy.get("h1").should("contain", title);

						cy.get(".Projekt_columns__XcPJT")
							.should("exist")
							.find(".shareButtons")
							.children()
							.should("have.length", 3);

						cy.get(".cardContainer").should("exist");

						//cy.get(".Projekt_linkSection__iXO_B").should("exist");
					});
			});
	});

	it("Vist a slug of each page [Kalender side]", () => {
		let title = "";

		cy.visit("/kalender");

		cy.wait(1000);

		cy.get(".container.section-container a")
			.first()
			.then((element) => {
				cy.wrap(element)
					.find("h2")
					.then((h2) => {
						title = h2.text();

						cy.wrap(element).find("p").should("exist");

						cy.wrap(element).click();
						cy.wait(1000);
						//Inde på underside

						cy.get("h1").should("contain", title);

						cy.get("div.kalender-main").should("exist");

						cy.get("div.kalender-main table").should("exist");
					});
			});
	});

	it("Vist a slug of each page [Nyheder side]", () => {
		let title = "";

		cy.visit("/nyheder");

		cy.wait(1000);

		cy.get(".news-box .news-item")
			.first()
			.then((element) => {
				cy.wrap(element)
					.find("h3")
					.then((h3) => {
						title = h3.text();

						cy.wrap(element).find("p").should("exist");

						cy.wrap(element).click();
						cy.wait(1000);
						//Inde på underside

						cy.get("h1").should("contain", title);

						cy.get(".shareButtons").children().should("have.length", 3);

						cy.get(".beskrivelse-news").should("exist");
					});
			});
	});

	it("Brug kontakt formular", () => {
		let name = faker.name.firstName();
		cy.visit("/kontakt");

		cy.wait(1000);

		cy.get("form#kontakt_formular");

		cy.get("input[name=name]")
			.should("exist")
			.type(faker.name.fullName({ firstName: name }));

		cy.get("input[name=email]")
			.should("exist")
			.type(faker.internet.email(name));

		cy.get("textarea[name=message]")
			.should("exist")
			.type(
				faker.lorem.paragraph(3) +
					"{enter}" +
					faker.lorem.paragraph(3) +
					"{enter} {enter}Med venlig hilsen " +
					name
			);
	});
});

export {};
