import Head from "next/head";
import { client } from "../components/contenful/main";
import WPInfoComponent from "../components/wordpress/WPInfoComponent";
import WPKalenderComponent from "../components/wordpress/WPKalenderComponent";
import WPLandingComponent from "../components/wordpress/WPLandingComponent";
import WPnewsComponent from "../components/wordpress/WPnewsComponent";
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

export default function InfoPage({ content }: any) {
	//Type == content.sys.contentType.sys.id

	return (
		<>
			<Head>
				<title>{content.data.page.title}</title>
				{content.data.page.excerpt && (
					<meta name="description" content={content.data.page.excerpt} />
				)}
			</Head>
		</>
	);
}
