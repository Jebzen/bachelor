import Head from "next/head";
import FrontBanner from "../components/frontBanner";
import { IndexLayout } from "../layout";

//Mock data
import { data, BannerImage, BannerVideo } from "../json/mock/frontBanner";

export default function Home() {
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
				<FrontBanner data={data} />
			</IndexLayout>
		</>
	);
}
