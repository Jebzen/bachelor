import Head from "next/head";
import FrontBanner from "../components/frontBanner";
import { IndexLayout } from "../layout";
import { useEffect, useState } from "react";

//Contenful
import { client } from "../components/contenful/main";
import { BannerType, FrontPageFields } from "../interfaces/frontpage";
import { BannerImage, BannerVideo } from "../interfaces/banner";
import NewsCards from "../components/NewsCards";
import ProjectBlobs from "../components/ProjekterBlobs";

export async function getServerSideProps() {
	const response = await client.getEntry("7fW3ZHZQgTQeFORANbS6Uk");

	//Hent projekter
	const projects = await (
		await fetch(
			`https://cdn.contentful.com/spaces/7mkgxnbudn0o/environments/master/entries?content_type=projekt`,
			{
				headers: {
					Authorization:
						"Bearer EcZKFhLUFp3op1UWgVR3qouQ8iwYwIDf0ZEdjygBZKA",
				},
			}
		)
	).json();

	//Hent nyheder
	const news = await (
		await fetch(
			`https://cdn.contentful.com/spaces/7mkgxnbudn0o/environments/master/entries?content_type=nyheder&limit=5`,
			{
				headers: {
					Authorization:
						"Bearer EcZKFhLUFp3op1UWgVR3qouQ8iwYwIDf0ZEdjygBZKA",
				},
			}
		)
	).json();
	//Put billede links og info i fields
	if (news.includes?.Asset) {
		news.items.map((item: any, i: number) => {
			item.fields.banner = news.includes.Asset.find((Asset: any) => {
				return Asset.sys.id == item?.fields?.banner?.sys?.id;
			});
			return item;
		});
	}

	return {
		props: {
			banners: response.fields.banners.map((banner: any) => {
				return {
					media: banner.fields.bannerBillede.fields.file.url,
					type: "Image",
					title: banner.fields.cta,
				} as BannerImage;
			}) as BannerImage[],
			news: news,
			projects: projects,
		},
	};
}

export default function Home(props: any) {
	//Alle props kommer ovenfra

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta
					name="description"
					content="KOMBIT HEADLESS NEXTJS APPLICATION"
				/>
			</Head>
			<FrontBanner banners={props.banners} />
			<h2>Projekter:</h2>
			<ProjectBlobs projects={props.projects} />
			<h2>Nyheder:</h2>
			<NewsCards news={props.news} />
		</>
	);
}
