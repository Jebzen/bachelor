import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../components/contenful/main";
import { IndexLayout } from "../layout";

export async function getServerSideProps(context: any) {
	//Find the slug
	const { slug } = context.query;
	const response = await (
		await fetch(
			`https://cdn.contentful.com/spaces/7mkgxnbudn0o/environments/master/entries`,
			{
				headers: {
					Authorization:
						"Bearer EcZKFhLUFp3op1UWgVR3qouQ8iwYwIDf0ZEdjygBZKA",
				},
			}
		)
	).json();

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
	console.log(content);

	return (
		<>
			<Head>
				<title>{content.fields.title}</title>
			</Head>
			<IndexLayout>
				{content.sys.contentType.sys.id &&
					content.sys.contentType.sys.id == "landingPage" && (
						<>Landing side</>
					)}
				{content.sys.contentType.sys.id &&
					content.sys.contentType.sys.id == "infoSide" && (
						<>Info side</>
					)}
				{content.sys.contentType.sys.id &&
					content.sys.contentType.sys.id == "projekt" && (
						<>Projekt side</>
					)}
				{content.sys.contentType.sys.id &&
					content.sys.contentType.sys.id == "nyheder" && (
						<>Nyheder side</>
					)}
			</IndexLayout>
		</>
	);
}
