import { json } from "stream/consumers";

export class GraphCatcher {
	static async getSinglePage(slug: string) {
		return "test";
	}
	static async getAllPages(categoryName: string) {
		return "test";
	}
	static async getMediaItem(id: string) {
		return "test";
	}
	static async getPageCard(id: string) {
		try {
			const response = await fetch("http://signepetersen.dk/graphql", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					query: `
            query PageCard {
              page(id: "${id}", idType: DATABASE_ID) {
                excerpt
                date
                slug
                title
                featuredImage{
                  node{
                    mediaItemUrl
                    title
                    description
                    altText
                  }
                }
              }
            }`,
				}),
			});

			return await response.json();
		} catch (e) {
			console.error("ERROR:", e);
			return null;
		}
	}
}
