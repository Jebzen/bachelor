import Head from "next/head";
import WPLandingComponent from "../../components/WordPress/WPLandingComponent";
import { GraphCatcher } from "../../data/GraphQL";
import { WPPageCard, WPSinglePage } from "../../interfaces/WPIndexes";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const json = await GraphCatcher.getSinglePage(slug);
	//console.log(json.data.page);

	//Hent sideindhold
	const res_page_json = await (
		await fetch(
			`http://signepetersen.dk/wp-json/wp/v2/pages/${json.data.page.pageId}`
		)
	).json();
	//console.log("1:", res_page_json);

	//Hent KontaktPerson
	json.data.page.kontakt_person = await GraphCatcher.getMediaItem(
		res_page_json.acf.kontakt_person
	);

	//Hent relateret projekter
	json.data.page.projekter = await Promise.all(
		res_page_json.acf.projekt.map(async (item: number) => {
			const thing = await GraphCatcher.getPageCard(item.toString());
			//console.log(thing.data.page);
			return thing;
		})
	);

	return {
		props: {
			content: json,
		},
	};
}

interface prop {
	content: WPSinglePage;
}

export default function LandingPage({ content }: prop) {
	const { page } = content.data;

	return (
		<>
			<Head>
				<title>{page.title}</title>
				{page.excerpt && <meta name="description" content={page.excerpt} />}
			</Head>
			<WPLandingComponent content={page} />
		</>
	);
}
