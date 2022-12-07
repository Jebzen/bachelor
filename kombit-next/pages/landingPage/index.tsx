import Head from "next/head";
import PageHero from "../../components/general/PageHero";
import { GraphCatcher } from "../../data/GraphQL";
import { WPAllPages } from "../../interfaces/WPIndexes";
import WPIndexes from "../../components/wordpress/WPIndexes";

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
			<PageHero heading={"Landing pages"}/>

			<section className="container">
				<div className="landing-box">
					<WPIndexes nodes={content.data.pages.nodes} parent="/landingpage" />
				</div>
			</section>
		</>
	);
}

