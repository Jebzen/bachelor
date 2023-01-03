import Head from "next/head";
import CFProjektComponent from "../../components/contenful/CFProjektComponent";
import { client } from "../../components/contenful/main";
import WPProjektComponent from "../../components/wordpress/WPProjektComponent";
import { GraphCatcher } from "../../data/GraphQL";
import { CFEntryProjekt } from "../../interfaces/CFentry";
import { WPSinglePage } from "../../interfaces/WPIndexes";

/* CONTENTFUL VERSION START */
export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const response = await client.getEntries({
		content_type: "projekt",
	});

	const slugged = response.items.find((item: any) => {
		//console.log(item);
		return item?.fields?.slug == slug;
	});

	if (slugged === undefined) {
		return {
			notFound: true,
		};
	}

	const entry = await client.getEntry(slugged.sys.id);

	console.log(
		"Page data is: " + Buffer.byteLength(JSON.stringify(entry)) / 1024 + " kB"
	);

	return {
		props: {
			content: entry,
		},
	};
}

interface prop {
	content: CFEntryProjekt;
}

export default function ProjektPage({ content }: prop) {
	//console.log(content);

	return (
		<>
			<Head>
				<title>{content.fields.title}</title>
				<meta name="description" content={content.fields.abstrakt} />
			</Head>
			<CFProjektComponent projekt={content} />
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

export default function ProjektPage({ content }: prop) {
	//console.log(content);
	if (!content.data) return;
	const { page } = content.data;

	return (
		<>
			<Head>
				<title>{page && page.title}</title>
				<meta name="description" content={page?.excerpt ? page.excerpt : ""} />
			</Head>
			<WPProjektComponent projekt={page} />
		</>
	);
}
/* WORDPRESS VERSION END */
