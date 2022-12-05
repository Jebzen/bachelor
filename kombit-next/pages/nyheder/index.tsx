import Head from "next/head";
import CFIndexes from "../../components/contenful/CFIndexes";
import CFProjektComponent from "../../components/contenful/CFProjektComponent";
import { client } from "../../components/contenful/main";
import WPIndexes from "../../components/wordpress/WPIndexes";
import { GraphCatcher } from "../../data/GraphQL";
import { CFEntryNyheder, CFEntryProjekt } from "../../interfaces/CFentry";
import { WPAllPages } from "../../interfaces/WPIndexes";

/* CONTENTFUL VERSION START */
/*
export async function getServerSideProps(context: any) {
	const response = await client.getEntries({
		content_type: "nyheder",
	});

	return {
		props: {
			content: response.items,
		},
	};
}

interface prop {
	content: CFEntryNyheder[];
}

export default function NewsIndex({ content }: prop) {
	//console.log(content.data.pages.nodes);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<section className="container">
				<h1>Nyheder</h1>
				<hr />
				<p>Bar</p>
				<hr />
				<div className="news-box">
					<CFIndexes nodes={content} parent="/nyheder" />
				</div>
			</section>
		</>
	);
}
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
export async function getServerSideProps(context: any) {
	const res = await GraphCatcher.getAllPages("nyheder");

	return {
		props: {
			content: res,
		},
	};
}

interface prop {
	content: WPAllPages;
}

export default function NewsIndex({ content }: prop) {
	//console.log(content.data.pages.nodes);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<section className="container">
				<h1>Nyheder</h1>
				<hr />
				<p>Bar</p>
				<hr />
				<div className="news-box">
					<WPIndexes nodes={content.data.pages.nodes} parent="/nyheder" />
				</div>
			</section>
		</>
	);
}
/* WORDPRESS VERSION END */
