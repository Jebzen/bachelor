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
          featuredImage {
            node {
              altText
              caption
              link
            }
          }
          tags {
            nodes {
              name
            }
          }
        }
      }`,
		}),
	});

	const json = await res.json();

	return {
		props: {
			json: json,
		},
	};
}

export default function Home({ banners, news, projects, json }: any) {
	//Alle props kommer ovenfra
	console.log(json);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
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
