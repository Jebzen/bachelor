import Head from "next/head";
import CFIndexes from "../../components/contenful/CFIndexes";
import { client } from "../../components/contenful/main";
import { CFEntryLanding } from "../../interfaces/CFentry";

export async function getServerSideProps(context: any) {
	const response = await client.getEntries({
		content_type: "landingpage",
	});

	return {
		props: {
			content: response.items,
		},
	};
}

interface prop {
	content: CFEntryLanding[];
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
					<CFIndexes nodes={content} parent={"/landingpage"} />
				</div>
			</section>
		</>
	);
}
