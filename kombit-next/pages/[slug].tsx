import Head from "next/head";
import { client } from "../components/contenful/main";
import { GraphCatcher } from "../data/GraphQL";

export async function getServerSideProps(context: any) {
	//Find the slug
	const { slug } = context.query;
	const response = await client.getEntries();

	const slugged = response.items.find((item: any) => {
		return item.fields?.slug == slug;
	});

	if (slugged === undefined) {
		return {
			notFound: true,
		};
	}

	//Find all info on page
	const content = await client.getEntry(slugged.sys.id);

	return {
		props: {
			content: content,
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
