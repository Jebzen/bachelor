export interface Banner {
	title: string;
	type?: string;
}

export interface BannerVideo extends Banner {
	type: "Video";
	media: string;
}

export interface BannerImage extends Banner {
	type: "Image";
	media: string;
}
