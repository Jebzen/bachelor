import { expect, jest } from "@jest/globals";
import { GraphCatcher } from "../data/GraphQL";
import { client } from "../components/contenful/main";

describe("Client Contentful", () => {
	it("Infosider types", async () => {
		const response = await client.getEntries({
			content_type: "infoside",
		});

		expect(response).toHaveProperty("items");

		response.items.map((item: any) => {
			expect(item).toHaveProperty("metadata");

			expect(item).toHaveProperty("sys");
			expect(item.sys).toHaveProperty("id");
			expect(item.sys.contentType).toHaveProperty("sys");
			expect(item.sys.contentType.sys).toHaveProperty("id");
			expect(item.sys.contentType.sys.id).toBe("infoside");

			expect(item).toHaveProperty("fields");
			expect(item.fields).toHaveProperty("title");
			expect(item.fields).toHaveProperty("slug");
			expect(item.fields).toHaveProperty("media");
			expect(item.fields).toHaveProperty("abstrakt");
			expect(item.fields).toHaveProperty("beskrivelse");
		});
	});

	it("Kalender types", async () => {
		const response = await client.getEntries({
			content_type: "kalender",
		});

		expect(response).toHaveProperty("items");

		response.items.map((item: any) => {
			expect(item).toHaveProperty("metadata");

			expect(item).toHaveProperty("sys");
			expect(item.sys).toHaveProperty("id");
			expect(item.sys.contentType).toHaveProperty("sys");
			expect(item.sys.contentType.sys).toHaveProperty("id");
			expect(item.sys.contentType.sys.id).toBe("kalender");

			expect(item).toHaveProperty("fields");
			expect(item.fields).toHaveProperty("title");
			expect(item.fields).toHaveProperty("slug");
			expect(item.fields).toHaveProperty("dato");
			expect(item.fields).toHaveProperty("abstrakt");
			expect(item.fields).toHaveProperty("beskrivelse");
		});
	});

	it("Landing types", async () => {
		const response = await client.getEntries({
			content_type: "landingpage",
		});

		expect(response).toHaveProperty("items");

		response.items.map((item: any) => {
			expect(item).toHaveProperty("metadata");

			expect(item).toHaveProperty("sys");
			expect(item.sys).toHaveProperty("id");
			expect(item.sys.contentType).toHaveProperty("sys");
			expect(item.sys.contentType.sys).toHaveProperty("id");
			expect(item.sys.contentType.sys.id).toBe("landingpage");

			expect(item).toHaveProperty("fields");
			expect(item.fields).toHaveProperty("title");
			expect(item.fields).toHaveProperty("slug");
			expect(item.fields).toHaveProperty("abstrakt");
			expect(item.fields).toHaveProperty("media");
			expect(item.fields).toHaveProperty("mission");
		});
	});

	it("Nyheder types", async () => {
		const response = await client.getEntries({
			content_type: "nyheder",
		});

		expect(response).toHaveProperty("items");

		response.items.map((item: any) => {
			expect(item).toHaveProperty("metadata");

			expect(item).toHaveProperty("sys");
			expect(item.sys).toHaveProperty("id");
			expect(item.sys.contentType).toHaveProperty("sys");
			expect(item.sys.contentType.sys).toHaveProperty("id");
			expect(item.sys.contentType.sys.id).toBe("nyheder");

			expect(item).toHaveProperty("fields");
			expect(item.fields).toHaveProperty("title");
			expect(item.fields).toHaveProperty("slug");
			expect(item.fields).toHaveProperty("abstrakt");
			expect(item.fields).toHaveProperty("banner");
			expect(item.fields).toHaveProperty("indhold");
		});
	});

	it("Projekt types", async () => {
		const response = await client.getEntries({
			content_type: "projekt",
		});

		expect(response).toHaveProperty("items");

		response.items.map((item: any) => {
			expect(item).toHaveProperty("metadata");

			expect(item).toHaveProperty("sys");
			expect(item.sys).toHaveProperty("id");
			expect(item.sys.contentType).toHaveProperty("sys");
			expect(item.sys.contentType.sys).toHaveProperty("id");
			expect(item.sys.contentType.sys.id).toBe("projekt");

			expect(item).toHaveProperty("fields");
			expect(item.fields).toHaveProperty("title");
			expect(item.fields).toHaveProperty("slug");
			expect(item.fields).toHaveProperty("abstrakt");
			expect(item.fields).toHaveProperty("featuredImage");
			expect(item.fields).toHaveProperty("beskrivelse");
		});
	});
});
