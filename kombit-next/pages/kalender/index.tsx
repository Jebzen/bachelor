import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { client } from "../../components/contenful/main";
import { GraphCatcher } from "../../data/GraphQL";

export async function getServerSideProps(context: any) {
	const response = await GraphCatcher.getAllPages("kalender");

	const pages = await Promise.all(
		response.data.pages.nodes.map(async (item: any) => {
			const res = await (
				await fetch(
					`http://signepetersen.dk/wp-json/wp/v2/pages/${item.pageId}`
				)
			).json();
			item["datetime"] = res.acf.dato;
			return item;
		})
	);

	return {
		props: {
			content: pages,
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
					{content &&
						content.length > 0 &&
						content.map((item: any, i: number) => {
							const date = `${item.datetime.substring(
								0,
								4
							)}-${item.datetime.substring(4, 6)}-${item.datetime.substring(
								6,
								8
							)}`;
							return (
								<a
									key={i}
									href={"/kalender/" + item.slug}
									className="text-decoration-none text-dark"
								>
									<h2>
										{date}
										<i className="bi-arrow-right-short"></i>
									</h2>
									<hr />
									<h3>{item.title}</h3>
									<span dangerouslySetInnerHTML={{ __html: item.excerpt }} />
								</a>
							);
						})}
				</div>
			</section>
		</>
	);
}
