import Head from "next/head";
import { IndexLayout } from "../../layout";
import { useEffect, useState } from "react";

//Contenful
import { client } from "../../components/contenful/main";
import { BannerType, FrontPageFields } from "../../interfaces/frontpage";
import { BannerImage, BannerVideo } from "../../interfaces/banner";
import WPIndexes from "../../components/WordPress/WPIndexes";

export async function getServerSideProps(context: any) {
	const res = await fetch("http://signepetersen.dk/graphql", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
      {
				pages(where: {categoryName: "Indhold"}) {
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

export default function InfoIndex({ content }: any) {
	//console.log(content.data.pages.nodes);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<section className="container">
				<h1>Info pages</h1>
				<hr />
				<p>Bar</p>
				<hr />
				<div className="info-box">
					<WPIndexes nodes={content.data.pages.nodes} parent="/infoSIde" />
				</div>
			</section>
		</>
	);
}
