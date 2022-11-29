import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../../components/contenful/main";
import InfoComponent from "../../components/InfoComponent";
import WPInfoComponent from "../../components/WordPress/WPInfoComponent";
import { GraphCatcher } from "../../data/GraphQL";
import { WPSinglePage } from "../../interfaces/WPIndexes";
import { IndexLayout } from "../../layout";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const json: WPSinglePage = await GraphCatcher.getSinglePage(slug);

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
	console.log(content);

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
