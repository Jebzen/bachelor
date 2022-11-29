import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../../components/contenful/main";
import KalenderComponent from "../../components/KalenderComponent";
import WPKalenderComponent from "../../components/WordPress/WPKalenderComponent";
import { GraphCatcher } from "../../data/GraphQL";
import { WPSinglePage } from "../../interfaces/WPIndexes";
import { IndexLayout } from "../../layout";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const json: WPSinglePage = await GraphCatcher.getSinglePage(slug);

	const res_page = await fetch(
		`http://signepetersen.dk/wp-json/wp/v2/pages/${json.data.page.pageId}`
	);
	const res_page_json = await res_page.json();

	json.data.page["datetime"] = res_page_json.acf.dato;

	return {
		props: {
			content: json,
		},
	};
}

interface prop {
	content: WPSinglePage;
}

export default function KalenderPage({ content }: prop) {
	console.log(content);

	return (
		<>
			<Head>
				<title>{content.data.page.title}</title>
				{content.data.page.excerpt && (
					<meta name="description" content={content.data.page.excerpt} />
				)}
			</Head>
			<WPKalenderComponent content={content} />
		</>
	);
}
