import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../../components/contenful/main";
import InfoComponent from "../../components/InfoComponent";
import { IndexLayout } from "../../layout";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const response = await client.getEntries({
		content_type: "infoSide",
	});

	const slugged = response.items.find((item: any) => {
		return item?.fields?.slug == slug;
	});

	if (slugged === undefined) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			content: slugged,
		},
	};
}

export default function InfoPage({ content }: any) {
	//console.log(content);

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
			<InfoComponent content={content} />
		</>
	);
}
