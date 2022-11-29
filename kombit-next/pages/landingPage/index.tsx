import Head from "next/head";
import WPIndexes from "../../components/WordPress/WPIndexes";
import { GraphCatcher } from "../../data/GraphQL";
import { WPAllPages } from "../../interfaces/WPIndexes";

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
			<section className="container">
				<h1>Landing pages</h1>
				<hr />
				<p>Bar</p>
				<hr />
				<div className="landing-box">
					<WPIndexes nodes={content.data.pages.nodes} parent="/landingpage" />
				</div>
			</section>
		</>
	);
}
