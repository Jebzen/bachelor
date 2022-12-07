import Head from "next/head";
import CFIndexes from "../../components/contenful/CFIndexes";
import { client } from "../../components/contenful/main";
import WPIndexes from "../../components/wordpress/WPIndexes";
import { GraphCatcher } from "../../data/GraphQL";
import { CFEntryIndhold } from "../../interfaces/CFentry";
import { WPAllPages } from "../../interfaces/WPIndexes";

/* CONTENTFUL VERSION START */
/*
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
	//console.log(content.data.pages.nodes);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<section className="container">
				<h1>Info pages</h1>
				<hr />
				<p>Bar</p>
				<hr />
				<div className="info-box">
					<CFIndexes nodes={content} parent={"/infoside"} />
				</div>
			</section>
		</>
	);
}
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
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
			<section className="container">
				<h1>Info pages</h1>
				<hr />
				<p>Bar</p>
				<hr />
				<div className="info-box">
					<WPIndexes nodes={content.data.pages.nodes} parent="/infoside" />
				</div>
			</section>
		</>
	);
}
/* WORDPRESS VERSION END */
