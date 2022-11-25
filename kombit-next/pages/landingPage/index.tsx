import Head from "next/head";
import WPIndexes from "../../components/WordPress/WPIndexes";

export async function getServerSideProps(context: any) {
	const res = await fetch("http://signepetersen.dk/graphql", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
      {
				pages(where: {categoryName: "Landing"}) {
					nodes {
						date
						excerpt
						slug
						title
						featuredImage {
							node {
								altText
								title
								mediaItemUrl
							}
						}
					}
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

export default function LandingIndex({ content }: any) {
	//console.log(content);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<section className="container">
				<h1>Landing pages</h1>
				<hr />
				<p>Bar</p>
				<hr />
				<div className="landing-box">
					<WPIndexes nodes={content.data.pages.nodes} parent="/landingPage" />
				</div>
			</section>
		</>
	);
}
