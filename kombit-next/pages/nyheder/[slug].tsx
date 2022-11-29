import Head from "next/head";
import WPnewsComponent from "../../components/WordPress/WPNewsComponent";
import { GraphCatcher } from "../../data/GraphQL";
import { WPSinglePage } from "../../interfaces/WPIndexes";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const json = await GraphCatcher.getSinglePage(slug);

	//TO DO
	//Relatered nyheder / projekter

	return {
		props: {
			content: json,
		},
	};
}

interface prop {
	content: WPSinglePage;
}

export default function NewsPage({ content }: prop) {
	const { page } = content.data;

	return (
		<>
			<Head>
				<title>{page.title}</title>
				{page.excerpt && <meta name="description" content={page.excerpt} />}
			</Head>
			<WPnewsComponent content={page} />
		</>
	);
}
