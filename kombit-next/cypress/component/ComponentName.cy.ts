import { first } from "cypress/types/lodash";
import ShareButtons from "../../components/general/ShareButtons";
import SoMeFeed from "../../components/general/SoMeFeed";

describe("ComponentName.cy.ts", () => {
	it("Share buttons", () => {
		cy.mount(ShareButtons());

		cy.get(".shareButtons").children().should("have.length", 3);
	});
});
