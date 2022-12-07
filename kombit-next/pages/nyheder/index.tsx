import Head from "next/head";
import PageHero from "../../components/general/PageHero";
// import WPIndexes from "../../components/wordpress/WPIndexes";
import WPIndexes from "../../components/WordPress/WPIndexes";
import { GraphCatcher } from "../../data/GraphQL";
import { WPAllPages } from "../../interfaces/WPIndexes";

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
				<title>Nyheder</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<PageHero heading={"Nyheder"}/>
			<section className="container">
		
				<div className="news-box">
					<WPIndexes nodes={content.data.pages.nodes} parent="/nyheder" />
				</div>
			</section>
		</>
	);
}

