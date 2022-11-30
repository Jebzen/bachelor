import { json } from "stream/consumers";
import {
	WPAllCategories,
	WPAllPages,
	WPAllPagesLimitSort,
	WPMediaItem,
	WPPageCard,
	WPSinglePage,
} from "../interfaces/WPIndexes";

export class GraphCatcher {
	static async getSinglePage(slug: string): Promise<WPSinglePage> {
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
              tags {
                nodes {
                  name
                  slug
                }
              }
              featuredImage {
                node {
                  altText
                  description
                  mediaItemUrl
                  title
                }
              }
              categories {
                nodes {
                  name
                  slug
                }
              }
              content
              modified
            }
        }`,
			}),
		});

		return await res.json();
	}

	static async getAllPages(categoryName: string): Promise<WPAllPages> {
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
              pageId
              tags {
                nodes {
                  name
                  slug
                }
              }
              featuredImage {
                node {
                  altText
                  title
                  mediaItemUrl
                  description
                }
              }
            }
          }
        }`,
			}),
		});

		return await res.json();
	}

	static async getMediaItem(id: string): Promise<WPMediaItem> {
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

	static async getPageCard(id: string): Promise<WPPageCard> {
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
              tags {
                nodes {
                  name
                  slug
                }
              }
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

	static async getAllPagesLimitSort(
		categoryName: string,
		limit: number
	): Promise<WPAllPagesLimitSort> {
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
                tags {
                  nodes {
                    name
                    slug
                  }
                }
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

	static async getAllCategories(): Promise<WPAllCategories> {
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
