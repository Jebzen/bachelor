import { expect, jest } from "@jest/globals";
import { GraphCatcher } from "../data/GraphQL";
import { client } from "../components/contenful/main";

//Broken test
describe("Wordpress GraphCatcher", () => {
	it("getAllCategories", async () => {
		const response = await GraphCatcher.getAllCategories();
		expect(response).not.toBe(null);

		response?.data?.categories?.nodes.map((node) => {
			expect(node.name).toBeDefined();
			expect(node.slug).toBeDefined();
		});
	});
	it("getAllPages", async () => {
		const response = await GraphCatcher.getAllPages("projekt");
		expect(response).not.toBe(null);

		const responseNegative = await GraphCatcher.getAllPages("ghagw46436ts");
		expect(responseNegative).not.toBe(null);
		expect(responseNegative?.data?.pages?.nodes.length).toBe(0);
	});
	it("getAllPagesLimitSort", async () => {
		const response = await GraphCatcher.getAllPagesLimitSort("projekt", 3);
		expect(response).not.toBe(null);
		expect(response?.data?.pages?.nodes).not.toBe(null);
		expect(response?.data?.pages?.nodes.length).not.toBe(0);
		expect(response?.data?.pages?.nodes.length).toBeGreaterThan(0);

		const responseNegative = await GraphCatcher.getAllPagesLimitSort(
			"projekt",
			0
		);
		expect(responseNegative).not.toBe(null);
		expect(responseNegative?.data?.pages?.nodes.length).toBeGreaterThan(0);

		const responseNegative_2 = await GraphCatcher.getAllPagesLimitSort(
			"tewgsdtgswet",
			3
		);
		expect(responseNegative_2).not.toBe(null);
		expect(responseNegative_2?.data?.pages?.nodes.length).toBe(0);
	});
	it("getMediaItem", async () => {
		const response = await GraphCatcher.getMediaItem("138");
		expect(response).not.toBe(null);
		expect(response?.data?.mediaItem).not.toBe(null);

		const responseNegative = await GraphCatcher.getMediaItem("0");
		expect(responseNegative).not.toBe(null);
		expect(responseNegative?.data?.mediaItem).toBeNull();
	});
	it("getPageCard", async () => {
		const response = await GraphCatcher.getPageCard("13");
		expect(response).not.toBe(null);
		expect(response?.data?.page).not.toBe(null);

		const responseNegative = await GraphCatcher.getPageCard("0");
		expect(responseNegative).not.toBe(null);
		expect(responseNegative?.data?.page).toBeNull();
	});
	it("getSinglePage", async () => {
		const response = await GraphCatcher.getSinglePage("arena");
		expect(response).not.toBe(null);
		expect(response?.data?.page).not.toBe(null);

		const responseNegative = await GraphCatcher.getSinglePage("0");
		expect(responseNegative).not.toBe(null);
		expect(responseNegative?.data?.page).toBeNull();
	});
});
