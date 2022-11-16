import Head from "next/head";
import FrontBanner from "../components/frontBanner";
import { IndexLayout } from "../layout";
import { useEffect, useState } from "react";

//Contenful
import { client } from "../components/contenful/main";
import { BannerType, FrontPageFields } from "../interfaces/frontpage";
import { BannerImage, BannerVideo } from "../interfaces/banner";

export async function getServerSideProps() {
	//Frontpage id
	const response = await client.getEntry("7fW3ZHZQgTQeFORANbS6Uk");
	console.log(response);
	return {
		props: {
			banners: response.fields.banners.map((banner: any) => {
				return {
					media: banner.fields.bannerBillede.fields.file.url,
					type: "Image",
					title: banner.fields.cta,
				} as BannerImage;
			}) as BannerImage[],
		},
	};
}

export default function Home(props: any) {
	console.log(props);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta
					name="description"
					content="KOMBIT HEADLESS NEXTJS APPLICATION"
				/>
			</Head>
			<IndexLayout>
				<FrontBanner banners={props.banners} />
				<div>[Projekterbox]</div>
				<div>[Nyhedsbox]</div>
			</IndexLayout>
		</>
	);
}
