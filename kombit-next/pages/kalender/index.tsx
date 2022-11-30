import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { client } from "../../components/contenful/main";
import { CFEntryKalender } from "../../interfaces/CFentry";

export async function getServerSideProps(context: any) {
	const response = await client.getEntries({
		content_type: "kalender",
	});

	return {
		props: {
			content: response.items,
		},
	};
}

interface prop {
	content: CFEntryKalender[];
}

export default function Kalender({ content }: prop) {
	console.log(content);

	return (
		<>
			<Head>
				<title>Kalender</title>
			</Head>
			<section className="container h-100">
				<div className="kalenderGrid">
					{content &&
						content.length > 0 &&
						content.map((item: any, i: number) => {
							return (
								<a
									key={i}
									href={"/kalender/" + item.fields.slug}
									className="text-decoration-none text-dark"
								>
									<h2>
										{item.fields.dato}
										<i className="bi-arrow-right-short"></i>
									</h2>
									<hr />
									<h3>{item.fields.title}</h3>
									{documentToReactComponents(item.fields.abstrakt)}
								</a>
							);
						})}
				</div>
			</section>
		</>
	);
}
