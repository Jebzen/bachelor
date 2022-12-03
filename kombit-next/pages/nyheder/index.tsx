import Head from "next/head";
import CFIndexes from "../../components/contenful/CFIndexes";
import { client } from "../../components/contenful/main";
import PageHero from "../../components/general/PageHero";
import { GraphCatcher } from "../../data/GraphQL";
import { CFEntryNyheder } from "../../interfaces/CFentry";
import { WPAllPages } from "../../interfaces/WPIndexes";

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
			<PageHero heading={"Nyheder"} />
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
