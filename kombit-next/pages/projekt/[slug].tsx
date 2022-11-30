import Head from "next/head";
import WPProjektComponent from "../../components/wordpress/WPProjektComponent";
import { GraphCatcher } from "../../data/GraphQL";
import { WPSinglePage } from "../../interfaces/WPIndexes";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const json = await GraphCatcher.getSinglePage(slug);

	//Hent sideindhold
	const res_page_json = await (
		await fetch(
			`http://signepetersen.dk/wp-json/wp/v2/pages/${json.data.page.pageId}`
		)
	).json();
	console.log("1:", res_page_json.acf.projekt);

	//Hent KontaktPerson
	if (res_page_json.acf.kontakt_person != "") {
		json.data.page.kontakt_person = await GraphCatcher.getMediaItem(
			res_page_json.acf.kontakt_person
		);
	}

	if (res_page_json.acf.projekt.length != 0) {
		//Hent relateret projekter
		json.data.page.projekter = await Promise.all(
			res_page_json.acf.projekt.map(async (item: number) => {
				const thing = await GraphCatcher.getPageCard(item.toString());
				//console.log(thing.data.page);
				return thing;
			})
		);
	}

	return {
		props: {
			content: json,
		},
	};
}

interface prop {
	content: WPSinglePage;
}

export default function ProjektPage({ content }: prop) {
	//console.log(content);
	const { page } = content.data;

	return (
		<>
			<Head>
				<title>{page.title}</title>
				<meta name="description" content={page.excerpt} />
			</Head>
			<WPProjektComponent projekt={page} />
		</>
	);
}
