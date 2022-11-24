import Head from "next/head";
import { IndexLayout } from "../../layout";
import { useEffect, useState } from "react";

//Contenful
import { client } from "../../components/contenful/main";
import { BannerType, FrontPageFields } from "../../interfaces/frontpage";
import { BannerImage, BannerVideo } from "../../interfaces/banner";
import WPNewsBox from "../../components/WordPress/WPNewsBox";

export async function getServerSideProps(context: any) {
	const res = await fetch("http://signepetersen.dk/graphql", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
      {
        pages(where: {categoryName: "Nyhed"}) {
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

export default function NewsIndex({ content }: any) {
	console.log(content.data.pages.nodes);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<section className="container">
				<h1>Nyheder</h1>
				<hr />
				<p>Bar</p>
				<hr />
				<div className="news-box">
					<WPNewsBox nodes={content.data.pages.nodes} />
					{/*content.map((item: any, i: number) => {
						return (
							<a
								href={"/nyheder/" + item.fields.slug}
								className={`box-${i + 1} news-item`}
								key={i}
							>
								<h2>{item.fields.title}</h2>
								<small className="fst-italic">
									{item.sys.createdAt}
								</small>
								<p>{item.fields.abstrakt}</p>
								<img
									src={item.fields.banner.fields.file.url}
									alt={item.fields.banner.fields.description}
								/>
							</a>
						);
					})*/}
				</div>
			</section>
		</>
	);
}
