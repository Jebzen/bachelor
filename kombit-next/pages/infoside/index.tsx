import Head from "next/head";
import CFIndexes from "../../components/contenful/CFIndexes";
import { client } from "../../components/contenful/main";
import PageHero from "../../components/general/PageHero";
import { CFEntryIndhold } from "../../interfaces/CFentry";
import { WPAllPages } from "../../interfaces/WPIndexes";
import WPIndexes from "../../components/wordpress/WPIndexes";
import { GraphCatcher } from "../../data/GraphQL";

/* CONTENTFUL VERSION START */
export async function getServerSideProps(context: any) {
	const response = await client.getEntries({
		content_type: "infoside",
	});

	return {
		props: {
			content: response.items,
		},
	};
}

interface prop {
	content: CFEntryIndhold[];
}

export default function InfoIndex({ content }: prop) {
	// console.log(content.data.pages.nodes);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<PageHero heading={"Info pages"} />

			<section className="container section-container">
				<div className="info-box">
					<CFIndexes nodes={content} parent={"/infoside"} />
				</div>
			</section>
		</>
	);
}
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
/*
export async function getServerSideProps(context: any) {
	const res = await GraphCatcher.getAllPages("infoside");

	return {
		props: {
			content: res,
		},
	};
}

interface prop {
	content: WPAllPages;
}

export default function InfoIndex({ content }: prop) {
	//console.log(content.data.pages.nodes);
	if (!content.data?.pages) return <></>;

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<PageHero heading="Info sider" />
			<section className="container section-container">
				<div className="info-box">
					<WPIndexes nodes={content.data.pages.nodes} parent="/infoside" />
				</div>
			</section>
		</>
	);
}
/* WORDPRESS VERSION END */
