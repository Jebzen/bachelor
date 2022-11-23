import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../../components/contenful/main";
import LandingComponent from "../../components/LandingComponent";
import { IndexLayout } from "../../layout";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;

	const response = await client.getEntries({
		content_type: "landingPage",
		"fields.slug": slug,
	});

	const content = response.items.find((item: any) => {
		return true;
	});

	if (content === undefined) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			content: content,
		},
	};
}

export default function LandingPage({ content }: any) {
	console.log(content);

	return (
		<>
			<Head>
				<title>{content.fields.title}</title>
				{content.fields?.abstrakt && (
					<meta
						name="description"
						content={content.fields?.abstrakt}
					/>
				)}
			</Head>
			<LandingComponent content={content} />
		</>
	);
}
