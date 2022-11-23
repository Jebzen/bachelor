import Head from "next/head";
import { IndexLayout } from "../../layout";
import { useEffect, useState } from "react";

//Contenful
import { client } from "../../components/contenful/main";
import { BannerType, FrontPageFields } from "../../interfaces/frontpage";
import { BannerImage, BannerVideo } from "../../interfaces/banner";

export async function getServerSideProps(context: any) {
	const response = await client.getEntries({
		content_type: "landingPage",
	});

	return {
		props: {
			content: response.items,
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
					{content.map((item: any, i: number) => {
						//console.log(item);
						return (
							<a
								href={"/nyheder/" + item.fields.slug}
								className={`box-${i + 1} news-item`}
								key={i}
							>
								<h2>{item.fields.title}</h2>
								<small className="fst-italic">{item.sys.createdAt}</small>
								<p>{item.fields.abstrakt}</p>
							</a>
						);
					})}
				</div>
			</section>
		</>
	);
}
