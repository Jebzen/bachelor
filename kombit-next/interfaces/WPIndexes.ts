export interface WPIndexes {
	data: {
		pages: {
			nodes: [
				{
					date: string;
					excerpt: string;
					slug: string;
					title: string;
					featuredImage: {
						node: featuredImage;
					};
				}
			];
		};
	};
}

export interface WPSinglePage {
	data: {
		page: {
			pageId: number;
			title: string;
			excerpt: string;
			tags: {
				nodes: {
					name: string;
					slug: string;
				}[];
			};
			featuredImage: {
				node: featuredImage;
			};
			categories: {
				nodes: {
					name: string;
					slug: string;
				}[];
			};
			content: string;
			modified: string;
			datetime?: string;
			kontakt_person?: any;
			projekter?: WPPageCard[];
		};
	};
}

export interface WPAllPages {
	data: {
		pages: {
			nodes: {
				date: string;
				excerpt: string;
				slug: string;
				title: string;
				pageId: number;
				tags: {
					nodes: {
						name: string;
						slug: string;
					}[];
				};
				featuredImage: {
					node: featuredImage;
				};
				datetime?: string;
			}[];
		};
	};
}

export interface WPMediaItem {
	data: {
		mediaItem: {
			altText: string;
			caption: string;
			description: string;
			mediaItemUrl: string;
			title: string;
		};
	};
}

export interface WPPageCard {
	data: {
		page: {
			excerpt: string;
			date: string;
			slug: string;
			title: string;
			tags: {
				nodes: {
					name: string;
					slug: string;
				}[];
			};
			featuredImage: {
				node: featuredImage;
			};
		};
	};
}

export interface WPAllPagesLimitSort {
	data: {
		pages: {
			nodes: {
				date: string;
				excerpt: string;
				slug: string;
				title: string;
				tags: {
					nodes: {
						name: string;
						slug: string;
					}[];
				};
				featuredImage: {
					node: featuredImage;
				};
			}[];
		};
	};
}

export interface WPAllCategories {
	data: {
		categories: {
			nodes: {
				name: string;
				slug: string;
			}[];
		};
	};
}

export interface WPSearchPages {
	data: {
		pages: {
			nodes: {
				date: string;
				excerpt: string;
				slug: string;
				title: string;
				featuredImage: {
					node: featuredImage;
				};
				categories: {
					nodes: {
						name: string;
						slug: string;
					}[];
				};
			}[];
		};
	};
}

export interface featuredImage {
	altText: string;
	caption: string;
	description: string;
	mediaItemUrl: string;
	title: string;
}
