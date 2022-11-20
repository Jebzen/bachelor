import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../components/contenful/main";
import { IndexLayout } from "../layout";
import LandingPage from "../components/LandingPage";
import NewsComponent from "../components/NewsComponent";

export async function getServerSideProps(context: any) {
	//Find the slug
	const { slug } = context.query;
	const response = await client.getEntries();

	const slugged = response.items.find((item: any) => {
		return item.fields?.slug == slug;
	});

	if (slugged === undefined) {
		return {
			notFound: true,
		};
	}

	//Find all info on page
	const content = await client.getEntry(slugged.sys.id);

	return {
		props: {
			content: content,
		},
	};
}

export default function InfoPage({ content }: any) {
	//Type == content.sys.contentType.sys.id
	//console.log(content);

	return (
		<>
			<Head>
				<title>{content.fields.title}</title>
			</Head>
			{content.sys.contentType.sys.id &&
				content.sys.contentType.sys.id == "landingPage" && (
					<LandingPage content={content} />
				)}
			{content.sys.contentType.sys.id &&
				content.sys.contentType.sys.id == "infoSide" && <>Info side</>}
			{content.sys.contentType.sys.id &&
				content.sys.contentType.sys.id == "projekt" && (
					<>Projekt side</>
				)}
			{content.sys.contentType.sys.id &&
				content.sys.contentType.sys.id == "nyheder" && (
					<NewsComponent content={content} />
				)}
		</>
	);
}
