import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../../components/contenful/main";
import InfoComponent from "../../components/InfoComponent";
import WPInfoComponent from "../../components/WordPress/WPInfoComponent";
import { IndexLayout } from "../../layout";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const res = await fetch("http://signepetersen.dk/graphql", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
				{
					page(id: "${slug}", idType: URI) {
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
	});

	const json = await res.json();

	return {
		props: {
			content: json,
		},
	};
}

export default function InfoPage({ content }: any) {
	console.log(content);

	return (
		<>
			<Head>
				<title>{content.data.page.title}</title>
				{content.data.page.excerpt && (
					<meta name="description" content={content.data.page.excerpt} />
				)}
			</Head>
			<WPInfoComponent content={content.data.page} />
		</>
	);
}
