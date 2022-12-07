import Head from "next/head";
import PageHero from "../../components/general/PageHero";
import { WPStringToTime } from "../../data/functions";
import { GraphCatcher } from "../../data/GraphQL";
import { WPAllPages } from "../../interfaces/WPIndexes";

export async function getServerSideProps(context: any) {
	const response: WPAllPages = await GraphCatcher.getAllPages("kalender");

	response.data.pages.nodes = await Promise.all(
		response.data.pages.nodes.map(async (item) => {
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
			content: response,
		},
	};
}

interface prop {
	content: WPAllPages;
}

export default function Kalender({ content }: prop) {
	//console.log(content);
	const { nodes } = content.data.pages;

	return (
		<>
			<Head>
				<title>Kalender</title>
			</Head>
			<PageHero heading={"Kalender"}/>
			<section className="container h-100">
				<div className="kalenderGrid">
					{nodes &&
						nodes.length > 0 &&
						nodes.map((item, i: number) => {
							const date =
								item.datetime !== undefined
									? WPStringToTime(item.datetime)
									: "";
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
