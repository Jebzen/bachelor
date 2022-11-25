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
						node: {
							altText: string;
							title: string;
							mediaItemUrl: string;
						};
					};
				}
			];
		};
	};
}
