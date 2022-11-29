import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../../components/contenful/main";
import ProjektComponent from "../../components/ProjektComponent";
import { CFentry } from "../../interfaces/CFentry";
import { IndexLayout } from "../../layout";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const response = await client.getEntries({
		content_type: "projekt",
	});

	const slugged: CFentry = response.items.find((item: any) => {
		//console.log(item);
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

interface prop {
	content: CFentry;
}

export default function ProjektPage({ content }: prop) {
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
