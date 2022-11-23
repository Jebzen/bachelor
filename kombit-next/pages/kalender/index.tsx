import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { client } from "../../components/contenful/main";

export async function getServerSideProps(context: any) {
	const response = await client.getEntries({
		content_type: "kalender",
	});

	return {
		props: {
			content: response,
		},
	};
}

export default function Kalender({ content }: any) {
	//console.log(content);

	return (
		<>
			<Head>
				<title>Kalender</title>
			</Head>
			<section className="container h-100">
				<div className="kalenderGrid">
					{content.items &&
						content.items.length > 0 &&
						content.items.map((item: any) => {
							return (
								<a
									href={"/kalender/" + item.fields.slug}
									className="text-decoration-none text-dark"
								>
									<h2>
										{item.fields.dato}
										<i className="bi-arrow-right-short"></i>
									</h2>
									<hr />
									<h3>{item.fields.title}</h3>
									{documentToReactComponents(
										item.fields.abstrakt
									)}
								</a>
							);
						})}
				</div>
			</section>
		</>
	);
}
