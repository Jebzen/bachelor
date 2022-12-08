import {
	WPAllCategories,
	WPAllPages,
	WPAllPagesLimitSort,
	WPMediaItem,
	WPPageCard,
	WPSinglePage,
} from "../interfaces/WPIndexes";
import fetch from "node-fetch";

export class GraphCatcher {
	static async getSinglePage(slug: string): Promise<WPSinglePage | null> {
		try {
			const res = await fetch("https://signepetersen.dk/graphql", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					query: `
            {
              page(id: "${slug}", idType: URI) {
                pageId
                title
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
                modified
                datoField {
                  dato
                }
                kombitFelter {
                  dokument {
                    title
                    sourceUrl
                  }
                  kontaktPerson {
                    title
                    mediaItemUrl
                    description
                    caption
                    altText
                  }
                  projekt {
                    ... on Page {
                      title
                      excerpt
                      slug
                      featuredImage{
                        node{
                          mediaItemUrl
                          altText
                        }
                      }
                    }
                  }
                }
                content
              }
          }`,
				}),
			});

			return (await res.json()) as WPSinglePage;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	static async getAllPages(categoryName: string): Promise<WPAllPages | null> {
		try {
			const res = await fetch("https://signepetersen.dk/graphql", {
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
                datoField {
                  dato
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

			return (await res.json()) as WPAllPages;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	static async getMediaItem(id: string): Promise<WPMediaItem | null> {
		try {
			const res = await fetch("https://signepetersen.dk/graphql", {
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

			return (await res.json()) as WPMediaItem;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	static async getPageCard(id: string): Promise<WPPageCard | null> {
		try {
			const response = await fetch("https://signepetersen.dk/graphql", {
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

			return (await response.json()) as WPPageCard;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	static async getAllPagesLimitSort(
		categoryName: string,
		limit: number
	): Promise<WPAllPagesLimitSort | null> {
		try {
			const response = await fetch("https://signepetersen.dk/graphql", {
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

			return (await response.json()) as WPAllPagesLimitSort;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	static async getAllCategories(): Promise<WPAllCategories | null> {
		try {
			const response = await fetch("https://signepetersen.dk/graphql", {
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

			return (await response.json()) as WPAllCategories;
		} catch (e) {
			console.error(e);
			return null;
		}
	}
}
