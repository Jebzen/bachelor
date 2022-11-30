import Head from "next/head";
import { GraphCatcher } from "../data/GraphQL";
import WPLandingComponent from "../components/wordpress/WPLandingComponent";
import WPInfoComponent from "../components/wordpress/WPInfoComponent";
import WPnewsComponent from "../components/wordpress/WPnewsComponent";
import WPKalenderComponent from "../components/wordpress/WPKalenderComponent";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const json = await GraphCatcher.getSinglePage(slug);

	if (json.data.page === null || !json.data.page.categories.nodes[0].slug) {
		return {
			notFound: true,
		};
	}

	//Landing page
	let kontakt_person: Promise<any> | null = null;
	let projekter: any[] | null = null;
	if (json.data.page?.categories?.nodes[0]?.slug == "landingpage") {
		const res_page_json = await (
			await fetch(
				`http://signepetersen.dk/wp-json/wp/v2/pages/${json.data.page.pageId}`
			)
		).json();
		//console.log("1:", res_page_json);

		//Hent KontaktPerson
		kontakt_person = await GraphCatcher.getMediaItem(
			res_page_json.acf.kontakt_person
		);

		//Hent relateret projekter
		projekter = await Promise.all(
			res_page_json.acf.projekt.map(async (item: number) => {
				const thing = await GraphCatcher.getPageCard(item.toString());
				//console.log(thing.data.page);
				return thing;
			})
		);
		//Kalender
	} else if (json.data.page?.categories?.nodes[0]?.slug == "kalender") {
		const res_page = await fetch(
			`http://signepetersen.dk/wp-json/wp/v2/pages/${json.data.page.pageId}`
		);
		const res_page_json = await res_page.json();

		json.data.page["datetime"] = res_page_json.acf.dato;
	}

	return {
		props: {
			content: json,
			kontakt_person: kontakt_person,
			projekter: projekter,
		},
	};
}

export default function InfoPage({ content, kontakt_person, projekter }: any) {
	//Type == content.sys.contentType.sys.id
	const slug = content.data.page.categories.nodes[0].slug;

	return (
		<>
			<Head>
				<title>{content.data.page.title}</title>
				{content.data.page.excerpt && (
					<meta name="description" content={content.data.page.excerpt} />
				)}
			</Head>
			{slug == "landingpage" && (
				<WPLandingComponent
					content={content.data.page}
					person={kontakt_person}
					projekter={projekter}
				/>
			)}
			{slug == "infoside" && <WPInfoComponent content={content.data.page} />}
			{/*slug == "projekt" && (
					<WPProjektComponent projekt={content} />
				)*/}
			{slug == "nyheder" && <WPnewsComponent content={content.data.page} />}
			{slug == "kalender" && (
				<WPKalenderComponent content={content.data.page} />
			)}
		</>
	);
}
