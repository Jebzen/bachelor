import Head from "next/head";
import { IndexLayout } from "../layout";

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
			<IndexLayout>bwah</IndexLayout>
		</>
	);
}
