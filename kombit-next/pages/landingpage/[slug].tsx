import Head from "next/head";
import CFLandingComponent from "../../components/contenful/CFLandingComponent";
import { client } from "../../components/contenful/main";
import { GraphCatcher } from "../../data/GraphQL";
import { CFEntryLanding } from "../../interfaces/CFentry";
import { WPPageCard, WPSinglePage } from "../../interfaces/WPIndexes";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;

	const response = await client.getEntries({
		content_type: "landingpage",
		"fields.slug": slug,
	});

	const content = response.items.find((item: any) => {
		return true;
	});

	if (content === undefined) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			content: content,
		},
	};
}

interface prop {
	content: CFEntryLanding;
}

export default function LandingPage({ content }: prop) {
	//console.log(content);

	return (
		<>
			<Head>
				<title>{content.fields.title}</title>
				{content.fields?.abstrakt && (
					<meta name="description" content={content.fields?.abstrakt} />
				)}
			</Head>
			<CFLandingComponent content={content} />
		</>
	);
}