export interface WP_Page_Single {
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
}

export interface WP_Page_Node {
	date: string;
	excerpt: string;
	slug: string;
	title: string;
	pageId?: number;
	content?: string;
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
}

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
		} | null;
	} | null;
}

export interface WPSinglePage {
	data: {
		page: WP_Page_Single | null;
	} | null;
}

export interface WPAllPages {
	data: {
		pages: {
			nodes: WP_Page_Node[];
		} | null;
	} | null;
}

export interface WPMediaItem {
	data: {
		mediaItem: {
			altText: string;
			caption: string;
			description: string;
			mediaItemUrl: string;
			title: string;
		} | null;
	} | null;
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
		} | null;
	} | null;
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
		} | null;
	} | null;
}

export interface WPAllCategories {
	data: {
		categories: {
			nodes: {
				name: string;
				slug: string;
			}[];
		} | null;
	} | null;
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
		} | null;
	} | null;
}

export interface featuredImage {
	altText: string;
	caption: string;
	description: string;
	mediaItemUrl: string;
	title: string;
}
