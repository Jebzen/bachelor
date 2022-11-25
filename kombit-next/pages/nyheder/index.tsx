import Head from "next/head";
import WPIndexes from "../../components/WordPress/WPIndexes";
import { GraphCatcher } from "../../data/GraphQL";

export async function getServerSideProps(context: any) {
	const res = await GraphCatcher.getAllPages("nyheder");

	return {
		props: {
			content: res,
		},
	};
}

export default function NewsIndex({ content }: any) {
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
