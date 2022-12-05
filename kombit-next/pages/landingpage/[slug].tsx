import Head from "next/head";
import CFLandingComponent from "../../components/contenful/CFLandingComponent";
import { client } from "../../components/contenful/main";
import WPLandingComponent from "../../components/wordpress/WPLandingComponent";
import { GraphCatcher } from "../../data/GraphQL";
import { CFEntryLanding } from "../../interfaces/CFentry";
import { WPPageCard, WPSinglePage } from "../../interfaces/WPIndexes";

/* CONTENTFUL VERSION START */
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
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
/*
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
	//console.log(content);
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
/* WORDPRESS VERSION END */
