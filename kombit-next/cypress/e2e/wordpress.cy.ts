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

						cy.wrap(element).find("p.small").should("exist");

						cy.wrap(element).click();
						cy.wait(1000);

						cy.get("h1").should("contain", title);

						cy.get(".shareButtons.some-icons")
							.children()
							.should("have.length", 3);

						cy.get(".WPFeedHeader")
							.find(".col-4")
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
						cy.wrap(element).find("span p").should("exist");

						cy.wrap(element).click();
						cy.wait(1000);
						//Inde på underside

						cy.get("h1").should("contain", title);

						//cy.get(".shareButtons").children().should("have.length", 3);

						cy.get(".container.news div.row.land")
							.find(".col-2.landing")
							.each((element, index, list) => {
								cy.wrap(element).should(
									"have.attr",
									"data-id",
									index.toString()
								);

								cy.wrap(element).find("p.text-center").should("exist");
								cy.wrap(element).find("img").should("exist");
								cy.wrap(element).find("a").should("exist");
							});

						cy.get(".forretningschef").should("exist");
						/*
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
							*/

						cy.get(".WPFeedHeader").children().should("have.length", 4);
						cy.get(".WPFeed").children().should("have.length", 3);

						cy.get(".WPFeedHeader .newsHeader")
							.first()
							.should("have.class", "active");

						cy.get(".WPFeed")
							.find(".content-column")
							.each((element) => {
								cy.wrap(element)
									.find("a")
									.invoke("attr", "href")
									.then((href: any) => {
										cy.wrap(href).should("include", "/nyheder/");
										cy.request(href).its("status").should("eq", 200);
									});
								cy.wrap(element).find("p").should("exist");
							});

						cy.get(".WPFeedHeader .newsHeader").first().next().click();

						cy.get(".WPFeed")
							.find(".content-column")
							.each((element) => {
								cy.wrap(element)
									.find("a")
									.invoke("attr", "href")
									.then((href: any) => {
										cy.wrap(href).should("include", "/projekt/");
										cy.request(href).its("status").should("eq", 200);
									});
								cy.wrap(element).find("p").should("exist");
							});

						cy.get(".WPFeedHeader .newsHeader").first().next().next().click();

						cy.get(".WPFeed")
							.find(".content-column")
							.each((element) => {
								cy.wrap(element)
									.find("a")
									.invoke("attr", "href")
									.then((href: any) => {
										cy.wrap(href).should("include", "/infoside/");
										cy.request(href).its("status").should("eq", 200);
									});
								cy.wrap(element).find("p").should("exist");
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
			.each((element) => {
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
						cy.wrap(element).find("span.text").should("exist");
						cy.wrap(element).find("a.read-more").should("exist");

						cy.wrap(element).find("a.read-more").click();
						cy.wait(1000);
						//Inde på underside

						cy.get("h1").should("contain", title);

						cy.get(".Projekt_columns__XcPJT")
							.should("exist")
							.find(".shareButtons.some-icons")
							.children()
							.should("have.length", 3);
					});
			});
	});

	it("Vist a slug of each page [Kalender side]", () => {
		let title = "";

		cy.visit("/kalender");

		cy.wait(1000);

		cy.get(".container .kalender")
			.first()
			.then((element) => {
				cy.wrap(element)
					.find("h2")
					.then((h2) => {
						title = h2.text();

						cy.wrap(element).find("p").should("exist");

						cy.wrap(element).click();
						cy.wait(2000);
						//Inde på underside

						cy.get("h1").should("contain", title);

						cy.get("h2.Calendar_calendarNumber__yqKqb").should("exist");
						cy.get("div.kalender-main").should("exist");
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

						cy.wrap(element).find("p.small").should("exist");

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
