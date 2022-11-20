import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../../components/contenful/main";
import { IndexLayout } from "../../layout";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;

	const response = await (
		await fetch(
			`https://cdn.contentful.com/spaces/7mkgxnbudn0o/environments/master/entries?content_type=projekt&fields.slug=${slug}`,
			{
				headers: {
					Authorization:
						"Bearer EcZKFhLUFp3op1UWgVR3qouQ8iwYwIDf0ZEdjygBZKA",
				},
			}
		)
	).json();

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

export default function ProjektPage({ content }: any) {
	//console.log(content);

	return (
		<>
			<Head>
				<title>{content.fields.title}</title>
			</Head>
			<div>
				<h1>{content.fields.title}</h1>
				<div>
					<h2>OM PROJEKTET:</h2>
					{documentToReactComponents(content.fields.beskrivelse)}
				</div>
			</div>
			<div>
				<>Card 1</>
				<>Card 2</>
				<>Card 3</>
			</div>
			<div>
				<>Links</>
				<>Projektleder</>
			</div>
		</>
	);
}
