import Head from "next/head";
import { IndexLayout } from "../../layout";
import { useEffect, useState } from "react";

//Contenful
import { client } from "../../components/contenful/main";
import { BannerType, FrontPageFields } from "../../interfaces/frontpage";
import { BannerImage, BannerVideo } from "../../interfaces/banner";
import WPIndexes from "../../components/WordPress/WPIndexes";
import { GraphCatcher } from "../../data/GraphQL";
import { WPAllPages } from "../../interfaces/WPIndexes";

export async function getServerSideProps(context: any) {
	const res = await GraphCatcher.getAllPages("infoside");

	return {
		props: {
			content: res,
		},
	};
}

interface prop {
	content: WPAllPages;
}

export default function InfoIndex({ content }: prop) {
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
					<WPIndexes nodes={content.data.pages.nodes} parent="/infoside" />
				</div>
			</section>
		</>
	);
}
