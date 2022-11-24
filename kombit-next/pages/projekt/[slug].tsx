import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../../components/contenful/main";
import ProjektComponent from "../../components/ProjektComponent";
import { IndexLayout } from "../../layout";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const response = await client.getEntries({
		content_type: "projekt",
	});

	const slugged = response.items.find((item: any) => {
		//console.log(item);
		return item?.fields?.slug == slug;
	});

	console.log("hej");

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

export default function ProjektPage({ content }: any) {
	//console.log(content);

	return (
		<>
			<Head>
				<title>{content.fields.title}</title>
				{content.fields?.abstrakt && (
					<meta name="description" content={content.fields?.abstrakt} />
				)}
			</Head>
			<ProjektComponent projekt={content} />
		</>
	);
}
