import { BannerImage, BannerVideo } from "../../interfaces/banner";

export const data = [
	{
		media: "https://static5.depositphotos.com/1006844/519/i/600/depositphotos_5196564-stock-photo-beautiful-young-woman-kissing-a.jpg",
		type: "Image",
		title: "Velkommen til Kombit.dk",
	} as BannerImage,
	{
		media: "https://www.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg",
		type: "Image",
		title: "Se alle vores ting!",
	} as BannerImage,
	{
		media: "https://cdn.mos.cms.futurecdn.net/CAZ6JXi6huSuN4QGE627NR.jpg",
		type: "Image",
		title: "Og meget mere",
	} as BannerImage,
] as Array<BannerImage | BannerVideo>;
