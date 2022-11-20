import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../../components/contenful/main";
import NewsComponent from "../../components/NewsComponent";
import { IndexLayout } from "../../layout";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const response = await client.getEntries({
		content_type: "nyheder",
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

export default function NewsPage({ content, sys }: any) {
	console.log(content);

	return (
		<>
			<Head>
				<title>{content.fields.title}</title>
			</Head>
			<NewsComponent content={content} />
		</>
	);
}
