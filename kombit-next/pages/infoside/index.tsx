import Head from "next/head";
import PageHero from "../../components/general/PageHero";
import { GraphCatcher } from "../../data/GraphQL";
import { WPAllPages } from "../../interfaces/WPIndexes";
import WPIndexes from "../../components/WordPress/WPIndexes";

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

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<PageHero heading="Info sider"/>
			<section className="container">
			
				<div className="info-box">
					<WPIndexes nodes={content.data.pages.nodes} parent="/infoside" />
				</div>
			</section>
		</>
	);
}
