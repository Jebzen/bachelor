import Head from "next/head";
import { client } from "../components/contenful/main";
import { BannerType, FrontPageFields } from "../interfaces/frontpage";
import { BannerImage, BannerVideo } from "../interfaces/banner";
import styles from "../styles/Projekt.module.css";
import CFFeed from "../components/contenful/CFFeed";
import CFProjectBlobs from "../components/contenful/CFProjekterBlobs";
import FrontBanner from "../components/general/FrontBanner";
import { GraphCatcher } from "../data/GraphQL";
import { WPAllPagesLimitSort, WP_Page_Node } from "../interfaces/WPIndexes";
import WPProjectBlobs from "../components/wordpress/WPProjekterBlobs";
import WPLandingComponent from "../components/wordpress/WPLandingComponent";
import WPLandingFeed from "../components/wordpress/WPLandingFeed";
import { CFEntryProjekt } from "../interfaces/CFentry";
import { useEffect, useState } from "react";

/* CONTENTFUL VERSION START */
/*
export async function getStaticProps() {
	const response = await client.getEntry("7fW3ZHZQgTQeFORANbS6Uk");

	//Hent projekter
	const projects = await client.getEntries({
		content_type: "projekt",
		limit: 3,
	});

	//Hent nyheder
	const news = await client.getEntries({
		content_type: "nyheder",
		limit: 3,
	});

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

export default function Home({
	banners,
	news,
	projects,
	setWhiteColor,
	whiteColor,
}: any) {
	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<FrontBanner banners={banners} />
			<section className="container section-container">
				<h2 id="slide">FORRETNINGSFÆLLSSKABER I KOMBIT</h2>
				<div className={styles.CardOverviewContaier}>
					<CFProjectBlobs projects={projects} />
				</div>
				<div className={styles.container}>
					<CFFeed />
				</div>
			</section>
		</>
	);
}
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
interface Banner {
	altText: string;
	caption: string;
	description: string;
	mediaItemUrl: string;
	title: string;
}

interface IndexPage {
	data: {
		page: {
			projekts: any;
			excerpt: string;
			content: string;
			title: string;
			slug: string;
			pageId: number;
			featuredImage: any;
			banners: any;
			bannersAndStuff: {
				banner1: Banner;
				banner2: Banner;
			};
			kombitFelter: any;
		};
	};
}

export async function getStaticProps() {
	const res = await fetch("https://signepetersen.dk/graphql", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
				{
					page(idType: URI, id: "/") {
						excerpt
						content(format: RENDERED)
						title
						slug
						pageId
						featuredImage {
							node {
								altText
								caption
								link
							}
						}
						kombitFelter {
							projekt {
								... on Page {
									title
									excerpt
								}
							}
						}
						bannersAndStuff {
							banner1 {
								mediaItemUrl
								title
							}
							banner2 {
								mediaItemUrl
								title
							}
						}
					}
				}`,
		}),
	});

	const json: IndexPage | any = await res.json();

	return {
		props: {
			json: json,
		},
	};
}

interface prop {
	json: IndexPage;
}

export default function Home({ json }: prop) {
	const [slide, setSlide] = useState("projekt");

	const [projects, setProjects] = useState<any>([]);

	useEffect(() => {
		//Kalender
		GraphCatcher.getAllPagesLimitSort("projekt", 3).then(async (response) => {
			setProjects(response?.data?.pages?.nodes);
		});
	}, []);
	//Alle props kommer ovenfra
	//console.log(json.data.page);

	const banners: BannerImage[] = [
		{
			title: json.data.page.bannersAndStuff.banner1.title,
			type: "Image",
			media: json.data.page.bannersAndStuff.banner1.mediaItemUrl,
		},
		{
			title: json.data.page.bannersAndStuff.banner2.title,
			type: "Image",
			media: json.data.page.bannersAndStuff.banner2.mediaItemUrl,
		},
	] as BannerImage[];
	//console.log(banners);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<FrontBanner banners={banners} />
			<section className="container section-container">
				<h2 id="slide">FORRETNINGSFÆLLSSKABER I KOMBIT</h2>

				<div className={styles.CardOverviewContaier}>
					{slide == "projekt" &&
						projects &&
						projects.length != 0 &&
						projects.map((item: WP_Page_Node, i: number) => {
							return <WPProjectBlobs item={item} />;
						})}
				</div>

				<div className={styles.container}>
					<WPLandingFeed />
				</div>
			</section>
		</>
	);
}
/* WORDPRESS VERSION END */
