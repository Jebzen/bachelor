interface sys {
	createdAt: string;
	id: string;
	local: string;
	revision: number;
	updatedAt: string;
	space: {
		sys: {
			id: string;
			linkType: string;
			type: string;
		};
	};
	environment: {
		sys: {
			id: string;
			linkType: string;
			type: string;
		};
	};
}

export interface BannerType {
	fields: {
		cta: string;
		bannerBillede: {
			fields: {
				description: string;
				title: string;
				file: {
					contentType: string;
					fileName: string;
					url: string;
					details: {
						size: number;
						image: {
							width: number;
							height: number;
						};
					};
				};
			};
			metadata: {
				tags: any[];
			};
			sys: sys;
			createdAt: string;
		};
	};
	metadata: any;
	sys: any;
	createdAt: string;
}

export interface FrontPageFields {
	banners: BannerType[];
}
