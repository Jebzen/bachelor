import { expect, jest } from "@jest/globals";
import { GraphCatcher } from "../data/GraphQL";
import { client } from "../components/contenful/main";

describe("Client Contentful", () => {
	it("Raw getContentTypes", async () => {
		const response = await client.getContentTypes();
		//console.log(response);
	});
});
