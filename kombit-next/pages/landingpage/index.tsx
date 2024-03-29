import Head from "next/head";
import CFIndexes from "../../components/contenful/CFIndexes";
import { client } from "../../components/contenful/main";
import { CFentry, CFEntryLanding } from "../../interfaces/CFentry";
import { WPAllPages } from "../../interfaces/WPIndexes";
import WPIndexes from "../../components/wordpress/WPIndexes";
import PageHero from "../../components/general/PageHero";
import { GraphCatcher } from "../../data/GraphQL";

/* CONTENTFUL VERSION START */
export async function getServerSideProps(context: any) {
	const response = await client.getEntries({
		content_type: "landingpage",
		select: [
			"fields.title",
			"fields.slug",
			"fields.abstrakt",
			"fields.sider",
			"fields.mission",
			"fields.media",
			"fields.forretningschef",
			"sys.createdAt",
		],
	});

	//console.log(response.items);

	return {
		props: {
			content: response.items,
		},
	};
}

interface prop {
	content: CFEntryLanding[];
}

export default function LandingIndex({ content }: prop) {
	//console.log(content);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<PageHero heading={"Landing pages"} />
			<section className="container section-container">
				<div className="landing-box">
					<CFIndexes nodes={content} parent={"/landingpage"} />
				</div>
			</section>
		</>
	);
}
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
/*
export async function getServerSideProps(context: any) {
	const res = await GraphCatcher.getAllPages("landingpage");

	return {
		props: {
			content: res,
		},
	};
}

interface prop {
	content: WPAllPages;
}

export default function LandingIndex({ content }: prop) {
	//console.log(content);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<PageHero heading={"Landing pages"} />

			<section className="container section-container">
				<div className="landing-box">
					{content.data?.pages && (
						<WPIndexes nodes={content.data.pages.nodes} parent="/landingpage" />
					)}
				</div>
			</section>
		</>
	);
}
/* CONTENTFUL VERSION END */
