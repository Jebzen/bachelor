import Head from "next/head";
import FrontBanner from "../components/frontBanner";
import { IndexLayout } from "../layout";
import { useEffect, useState } from "react";

//Contenful
import { client } from "../components/contenful/main";
import { BannerType, FrontPageFields } from "../interfaces/frontpage";
import { BannerImage, BannerVideo } from "../interfaces/banner";
import NewsCards from "../components/NewsCards";
import ProjectBlobs from "../components/ProjekterBlobs";
import WPFrontBanner from "../components/WordPress/WPFrontBanner";

export async function getStaticProps() {
	const res = await fetch("http://signepetersen.dk/graphql", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
				{
					page(idType: URI, id: "/") {
							excerpt
							content(format: RENDERED)
							title
							slug
							pageId
							featuredImage {
									node {
									altText
									caption
									link
									}
							}
					}
				}`,
		}),
	});

	const json = await res.json();

	//console.log("0:", json.data.page.pageId);
	//Extra for banner pictures
	const res_page = await fetch(
		`http://signepetersen.dk/wp-json/wp/v2/pages/${json.data.page.pageId}`
	);
	const res_page_json = await res_page.json();
	//console.log("1:", res_page_json);

	const res_banner = await fetch(res_page_json._links["wp:attachment"][0].href);
	const res_banner_json = await res_banner.json();
	//console.log("2:", res_banner_json);

	return {
		props: {
			json: json,
			extra: res_banner_json.filter((item: any) => {
				return (
					item.id == res_page_json.acf?.banner_1 ||
					item.id == res_page_json.acf?.banner_2
				);
			}),
		},
	};
}

export default function Home({ json, extra }: any) {
	//Alle props kommer ovenfra
	//console.log(json, extra);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<WPFrontBanner banners={extra} />
			<div dangerouslySetInnerHTML={{ __html: json.data.page.content }} />
			{/* 
			<FrontBanner banners={banners} />
			<section className="container">
				<h2>Projekter:</h2>
				<ProjectBlobs projects={projects} />
				<h2>Nyheder:</h2>
				<NewsCards news={news} />
			</section>
      */}
		</>
	);
}
