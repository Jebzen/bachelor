import Head from "next/head";
import CFIndexes from "../../components/contenful/CFIndexes";
import { client } from "../../components/contenful/main";
import { GraphCatcher } from "../../data/GraphQL";
import { CFEntryLanding } from "../../interfaces/CFentry";
import { WPAllPages } from "../../interfaces/WPIndexes";
import WPIndexes from "../../components/wordpress/WPIndexes";
import PageHero from "../../components/general/PageHero";

/* CONTENTFUL VERSION START */
export async function getServerSideProps(context: any) {
	const response = await client.getEntries({
		content_type: "landingpage",
	});

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
			<section className="container">
				<h1>Landing pages</h1>
				<hr />
				<p>Bar</p>
				<hr />
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

			<section className="container">
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
