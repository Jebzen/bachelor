import Head from "next/head";
import WPnewsComponent from "../../components/WordPress/WPNewsComponent";

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

export default function NewsPage({ content }: any) {
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
