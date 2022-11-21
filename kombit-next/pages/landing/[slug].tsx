import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../../components/contenful/main";
import { IndexLayout } from "../../layout";

export async function getServerSideProps(context: any) {
	const { slug } = context.query;
	const response = await (
		await fetch(
			`https://cdn.contentful.com/spaces/7mkgxnbudn0o/environments/master/entries?content_type=landingPage&fields.slug=${slug}`,
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

export default function LandingPage({ content }: any) {
	console.log(content);

	return (
		<>
			<Head>
				<title>{content.fields.title}</title>
			</Head>
			<IndexLayout>
				<div>
					<div>[Projekter]</div>
					<div>[Beskrivelse for valgt projekt]</div>
				</div>
				<div>
					<div>[MISSION]</div>
					<div>[Forretningschef]</div>
				</div>
				<div>[Nyhedsbox]</div>
			</IndexLayout>
		</>
	);
}
