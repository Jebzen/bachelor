import Head from "next/head";
import { IndexLayout } from "../../layout";
import { useEffect, useState } from "react";

//Contenful
import { client } from "../../components/contenful/main";
import { BannerType, FrontPageFields } from "../../interfaces/frontpage";
import { BannerImage, BannerVideo } from "../../interfaces/banner";

export async function getServerSideProps(context: any) {
	const response = await client.getEntries({
		content_type: "nyheder",
	});

	return {
		props: {
			content: response.items,
		},
	};
}

export default function NewsIndex({ content }: any) {
	//console.log(content);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta
					name="description"
					content="KOMBIT HEADLESS NEXTJS APPLICATION"
				/>
			</Head>
			<section className="container">
				<h1>Nyheder</h1>
				<hr />
				<p>Bar</p>
				<hr />
				<div className="news-box">
					{content.map((item: any, i: number) => {
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
					})}
				</div>
			</section>
		</>
	);
}
