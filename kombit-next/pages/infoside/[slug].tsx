import Head from "next/head";
import CFInfoComponent from "../../components/contenful/CFInfoComponent";
import { client } from "../../components/contenful/main";
import WPInfoComponent from "../../components/wordpress/WPInfoComponent";
import { GraphCatcher } from "../../data/GraphQL";
import { CFEntryIndhold } from "../../interfaces/CFentry";
import { WPSinglePage } from "../../interfaces/WPIndexes";

/* CONTENTFUL VERSION START */
/*
export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const response = await client.getEntries({
		content_type: "infoside",
	});

	const slugged = response.items.find((item: any) => {
		return item?.fields?.slug == slug;
	});

	if (slugged === undefined) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			content: slugged,
		},
	};
}

interface prop {
	content: CFEntryIndhold;
}

export default function InfoPage({ content }: prop) {
	//console.log(content);

	return (
		<>
			<Head>
				<title>{content.fields.title}</title>

				{content.fields?.abstrakt && (
					<meta name="description" content={content.fields?.abstrakt} />
				)}
			</Head>
			<CFInfoComponent content={content} />
		</>
	);
}
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
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

export default function InfoPage({ content }: prop) {
	//console.log(content);
	if (!content.data?.page) return <></>;

	return (
		<>
			<Head>
				<title>{content.data.page.title}</title>
				{content.data.page.excerpt && (
					<meta name="description" content={content.data.page.excerpt} />
				)}
			</Head>
			<WPInfoComponent content={content} />
		</>
	);
}
/* WORDPRESS VERSION END */
