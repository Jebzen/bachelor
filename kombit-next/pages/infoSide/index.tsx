import Head from "next/head";
import CFIndexes from "../../components/contenful/CFIndexes";
import { client } from "../../components/contenful/main";
import { CFEntryIndhold } from "../../interfaces/CFentry";

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
