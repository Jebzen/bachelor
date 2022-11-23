import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { createClient } from "contentful";
import { IndexLayout } from "../../layout";
import styles from "../../styles/Projekt.module.css";
import Image from "next/image";
import ProjectCards from "../../components/ProjectCard";
import { client } from "../../components/contenful/main";
import ProjektComponent from "../../components/ProjektComponent";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const response = await client.getEntries({
		content_type: "projekt",
		"fields.slug": slug,
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

export default function ProjektPage({ content }: any) {
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
			<ProjektComponent projekt={content} />
		</>
	);
}
