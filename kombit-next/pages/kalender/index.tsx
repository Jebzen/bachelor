import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { client } from "../../components/contenful/main";
import { WPStringToTime } from "../../data/functions";
import { GraphCatcher } from "../../data/GraphQL";
import { CFEntryKalender } from "../../interfaces/CFentry";
import { WPAllPages } from "../../interfaces/WPIndexes";

/* CONTENTFUL VERSION START */
/*
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
							return (
								<a
									key={i}
									href={"/kalender/" + item.fields.slug}
									className="text-decoration-none text-dark"
								>
									<h3>
										{item.fields.dato}
										<i className="bi-arrow-right-short"></i>
									</h3>
									<hr />
									<h2>{item.fields.title}</h2>
									{documentToReactComponents(item.fields.abstrakt)}
								</a>
							);
						})}
				</div>
			</section>
		</>
	);
}
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
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
									<h3>
										{date}
										<i className="bi-arrow-right-short"></i>
									</h3>
									<hr />
									<h2>{item.title}</h2>
									<span dangerouslySetInnerHTML={{ __html: item.excerpt }} />
								</a>
							);
						})}
				</div>
			</section>
		</>
	);
}
/* WORDPRESS VERSION END */
