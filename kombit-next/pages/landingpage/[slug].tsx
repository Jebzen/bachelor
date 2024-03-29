import Head from "next/head";
import CFLandingComponent from "../../components/contenful/CFLandingComponent";
import { client } from "../../components/contenful/main";
import { GraphCatcher } from "../../data/GraphQL";
import { CFEntryLanding } from "../../interfaces/CFentry";
import { WPPageCard, WPSinglePage } from "../../interfaces/WPIndexes";
import WPLandingComponent from "../../components/wordpress/WPLandingComponent";

/* CONTENTFUL VERSION START */
export async function getServerSideProps(context: any) {
	const { slug } = context.query;

	const response = await client.getEntries({
		content_type: "landingpage",
	});

	const slugged = response.items.find((item: any) => {
		return item?.fields?.slug == slug;
	});

	if (slugged === undefined) {
		return {
			notFound: true,
		};
	}

	const entry = await client.getEntry(slugged.sys.id);

	return {
		props: {
			content: entry,
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
	//console.log(content.data?.page);
	if (!content.data?.page) return <></>;
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
