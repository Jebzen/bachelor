import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../../components/contenful/main";
import LandingComponent from "../../components/LandingComponent";
import WPLandingComponent from "../../components/WordPress/WPLandingComponent";
import { GraphCatcher } from "../../data/GraphQL";
import { WPIndexes } from "../../interfaces/WPIndexes";
import { IndexLayout } from "../../layout";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const json = await (
		await fetch("http://signepetersen.dk/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: `
				{
					page(id: "${slug}", idType: URI) {
						pageId
						title
						excerpt
						featuredImage {
							node {
								altText
								description
								mediaItemUrl
								title
							}
						}
						content
					}
				}`,
			}),
		})
	).json();

	//Hent sideindhold
	const res_page_json = await (
		await fetch(
			`http://signepetersen.dk/wp-json/wp/v2/pages/${json.data.page.pageId}`
		)
	).json();
	//console.log("1:", res_page_json);

	//Hent KontaktPerson
	const kontakt_person_json = await (
		await fetch("http://signepetersen.dk/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: `
				query MediaItem {
					mediaItem(id: "${res_page_json.acf.kontakt_person}", idType: DATABASE_ID) {
						altText
						caption
						description
						mediaItemUrl
						title
					}
				}`,
			}),
		})
	).json();

	//Hent relateret projekter
	const projekter: any[] = await Promise.all(
		res_page_json.acf.projekt.map(async (item: number) => {
			const thing = await GraphCatcher.getPageCard(item.toString());
			//console.log(thing.data.page);
			return thing;
		})
	);

	return {
		props: {
			content: json,
			res_page_json: res_page_json,
			kontakt_person_json: kontakt_person_json,
			projekter: projekter,
		},
	};
}

export default function LandingPage({
	content,
	res_page_json,
	kontakt_person_json,
	projekter,
}: any) {
	const { page } = content.data;

	return (
		<>
			<Head>
				<title>{page.title}</title>
				{page.excerpt && <meta name="description" content={page.excerpt} />}
			</Head>
			<WPLandingComponent
				content={page}
				person={kontakt_person_json}
				projekter={projekter}
			/>
		</>
	);
}
