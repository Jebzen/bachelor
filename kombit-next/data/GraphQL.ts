import { json } from "stream/consumers";

export class GraphCatcher {
	static async getSinglePage(slug: string) {
		const res = await fetch("http://signepetersen.dk/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: `
          {
            page(id: "${slug}", idType: URI) {
              title
              pageId
              excerpt
              featuredImage {
                  node {
                  altText
                  description
                  mediaItemUrl
                  title
                  }
              }
              content
            }
        }`,
			}),
		});

		return await res.json();
	}

	static async getAllPages(categoryName: string) {
		const res = await fetch("http://signepetersen.dk/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: `
        {
          pages(where: {categoryName: "${categoryName}"}) {
            nodes {
              date
              excerpt
              slug
              title
              featuredImage {
                node {
                  altText
                  title
                  mediaItemUrl
                }
              }
            }
          }
        }`,
			}),
		});

		return await res.json();
	}

	static async getMediaItem(id: string) {
		const res = await fetch("http://signepetersen.dk/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: `
          query MediaItem {
            mediaItem(id: "${id}", idType: DATABASE_ID) {
              altText
              caption
              description
              mediaItemUrl
              title
            }
          }`,
			}),
		});

		return await res.json();
	}

	static async getPageCard(id: string) {
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
	}

	static async getAllPagesLimitSort(categoryName: string, limit: number) {
		const response = await fetch("http://signepetersen.dk/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: `
          query AllPagesLimitSort {
            pages(
              where: {categoryName: "${categoryName}", orderby: {field: DATE, order: DESC}}
              first: ${limit}
            ) {
              nodes {
                date
                excerpt
                slug
                title
                featuredImage {
                  node {
                    altText
                    title
                    mediaItemUrl
                  }
                }
              }
            }
          }`,
			}),
		});

		return await response.json();
	}

	static async getAllCategories() {
		const response = await fetch("http://signepetersen.dk/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: `
          query AllCategories {
            categories(where: {childless: true, exclude: "1"}) {
              nodes {
                name
                slug
              }
            }
          }`,
			}),
		});

		return await response.json();
	}
}
