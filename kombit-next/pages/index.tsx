import Head from "next/head";
import FrontBanner from "../components/frontBanner";
import { IndexLayout } from "../layout";

//Mock data
import { useEffect, useState } from "react";

//Contenful
import { client } from "../components/contenful/main";
import { BannerType, FrontPageFields } from "../interfaces/frontpage";
import { BannerImage } from "../interfaces/banner";

export default function Home() {
	const [banners, setBanners] = useState({});

	useEffect(() => {
		client.getEntry("7fW3ZHZQgTQeFORANbS6Uk").then((response: any) => {
			const thing = response.fields as FrontPageFields;
			setBanners(
				thing.banners.map((banner) => {
					return {
						media: banner.fields.bannerBillede.fields.file.url,
						type: "Image",
						title: banner.fields.cta,
					} as BannerImage;
				})
			);
		});
	}, []);

	return (
		<>
			<Head>
				<title>KOMBIT APP</title>
				<meta
					name="description"
					content="KOMBIT HEADLESS NEXTJS APPLICATION"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<IndexLayout>
				<FrontBanner data={banners} />
			</IndexLayout>
		</>
	);
}
