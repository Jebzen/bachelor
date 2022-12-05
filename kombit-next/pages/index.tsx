import Head from "next/head";
import { client } from "../components/contenful/main";
import { BannerType, FrontPageFields } from "../interfaces/frontpage";
import { BannerImage, BannerVideo } from "../interfaces/banner";
import styles from "../styles/Projekt.module.css";
import CFFeed from "../components/contenful/CFFeed";
import CFProjectBlobs from "../components/contenful/CFProjekterBlobs";
import FrontBanner from "../components/general/FrontBanner";
import { GraphCatcher } from "../data/GraphQL";
import { WPAllPagesLimitSort } from "../interfaces/WPIndexes";
import WPProjectBlobs from "../components/wordpress/WPProjekterBlobs";
import WPLandingComponent from "../components/wordpress/WPLandingComponent";
import WPLandingFeed from "../components/wordpress/WPLandingFeed";
import { CFEntryProjekt } from "../interfaces/CFentry";

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

export default function Home({ banners, news, projects }: any) {
	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<FrontBanner banners={banners} />
			<div className={styles.container}>
				<h2 id="slide">FORRETNINGSFÆLLSSKABER I KOMBIT</h2>
			</div>
			<div className={styles.CardOverviewContaier}>
				<CFProjectBlobs projects={projects} />
			</div>
			<div className={styles.container}>
				<CFFeed />
			</div>
		</>
	);
}
*/
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
interface IndexPage {
	data: {
		page: {
			projekts: WPAllPagesLimitSort["data"]["pages"]["nodes"];
			excerpt: string;
			content: string;
			title: string;
			slug: string;
			pageId: number;
			featuredImage: any;
			banners: any;
		};
	};
}

export async function getStaticProps() {
	const res = await fetch("http://signepetersen.dk/graphql", {
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
					}
				}`,
		}),
	});

	const json: IndexPage = await res.json();

	//console.log("0:", json.data.page.pageId);
	//Extra for banner pictures
	const res_page = await (
		await fetch(
			`http://signepetersen.dk/wp-json/wp/v2/pages/${json.data.page.pageId}`
		)
	).json();
	//console.log("1:", res_page);

	json.data.page.banners = (
		await (await fetch(res_page._links["wp:attachment"][0].href)).json()
	).filter((item: any) => {
		return (
			item.id == res_page.acf?.banner_1 || item.id == res_page.acf?.banner_2
		);
	});

	json.data.page.projekts = (
		await GraphCatcher.getAllPagesLimitSort("projekt", 3)
	).data.pages.nodes;

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
	//Alle props kommer ovenfra
	//console.log(json.data.page);

	const banners: BannerImage[] = json.data.page.banners.map((banner: any) => {
		return {
			title: banner.title.rendered,
			type: "Image",
			media: banner.source_url,
		};
	});
	//console.log(banners);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<FrontBanner banners={banners} />
			<div className={styles.container}>
				<h2 id="slide">FORRETNINGSFÆLLSSKABER I KOMBIT</h2>
			</div>
			<div className={styles.CardOverviewContaier}>
				<WPProjectBlobs projects={json.data.page.projekts} />
			</div>
			<div className={styles.container}>
				<WPLandingFeed />
			</div>
		</>
	);
}
/* WORDPRESS VERSION END */
