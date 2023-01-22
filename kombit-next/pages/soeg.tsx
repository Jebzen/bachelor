import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../components/contenful/main";
import { IndexLayout } from "../layout";
import { useEffect, useState } from "react";

/* CONTENTFUL VERSION START */
export async function getServerSideProps(context: any) {
	const term =
		context.query.term && context.query.term != "" ? context.query.term : null;
	let response = null;

	if (term) {
		response = await client.getEntries({
			query: term,
		});
		response.items = response.items.filter((entry: any) => {
			return (
				entry.sys.contentType.sys.id == "kalender" ||
				entry.sys.contentType.sys.id == "landingpage" ||
				entry.sys.contentType.sys.id == "projekt" ||
				entry.sys.contentType.sys.id == "infoside" ||
				entry.sys.contentType.sys.id == "nyheder"
			);
		});
	}

	let reduced = response?.items?.map((item: any) => {
		return {
			slug: item?.sys?.contentType?.sys?.id
				? item.sys.contentType.sys.id + "/" + item.fields.slug
				: item.fields.slug,

			title: item.fields.title,

			abstrakt: item.fields.abstrakt,

			abstrakt_type:
				item.fields.abstrakt?.nodeType != undefined
					? item.fields.abstrakt?.nodeType
					: null,
		};
	});

	if (reduced === undefined) reduced = null;

	return {
		props: {
			term: term,
			reduced: reduced,
		},
	};
}

interface prop {
	term: string | null;
	reduced: any[];
}

export default function Search(props: prop) {
	const [searchTerm, setSearchTerm] = useState(props.term ? props.term : "");

	return (
		<>
			<Head>
				<title>{props.term ? "Søger efter: " + props.term : "Søgning"}</title>
			</Head>
			<section className="container h-100">
				<section className="container">
					{props.term && (
						<h1 className="mt-2">
							Søgte efter: <i>{props.term}</i>
						</h1>
					)}
					{!props.term && <h1 className="mt-2">Søgeside</h1>}
					<div>
						<form className="input-group mb-3" action="/soeg">
							<input
								type="text"
								className="form-control"
								placeholder="Søg her..."
								aria-label="Søgningsfelt"
								name="term"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<button
								className="input-group-text"
								type="submit"
								id="button-addon2"
							>
								Søg <i className="ms-1 bi bi-search"></i>
							</button>
						</form>

						{props.reduced && props.reduced?.length == 0 && (
							<p>
								Ingen resultater for: <i>{props.term}</i>
							</p>
						)}
						{props.reduced && (
							<div className="search-grid">
								{props.reduced &&
									props.reduced.map((item: any, i: number) => {
										//console.log(item);
										return (
											<a
												key={i}
												href={item.slug}
												className="d-flex flex-column"
											>
												<h3>{item.title}</h3>
												{item.abstrakt_type == "document" &&
													documentToReactComponents(item.abstrakt)}
												{item.abstrakt_type != "document" && (
													<p>{item.abstrakt}</p>
												)}
											</a>
										);
									})}
							</div>
						)}
					</div>
				</section>
			</section>
		</>
	);
}
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
/*
export async function getServerSideProps(context: any) {
	const term =
		context.query.term && context.query.term != "" ? context.query.term : null;
	//const term = context.term;

	let response = null;

	if (term) {
		const res = await fetch("http://signepetersen.dk/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: `
					query SearchPages {
						pages(where: {search: "${term}"}) {
							nodes {
								date
								excerpt
								slug
								title
								featuredImage {
									node {
										altText
										caption
										description
										mediaItemUrl
										title
									}
								}
								categories {
									nodes {
										name
										slug
									}
								}
							}
						}
					}`,
			}),
		});
		response = await res.json();
	}

	return {
		props: {
			term: term,
			response: response?.data?.pages.nodes ? response.data.pages.nodes : null,
		},
	};
}

export default function Search(props: any) {
	const [searchTerm, setSearchTerm] = useState(props.term ? props.term : "");
	//console.log(props.response);

	return (
		<>
			<Head>
				<title>{props.term ? "Søger efter: " + props.term : "Søgning"}</title>
			</Head>
			<section className="container">
				{props.term && (
					<h1 className="mt-2">
						Søgte efter: <i>{props.term}</i>
					</h1>
				)}
				{!props.term && <h1 className="mt-2">Søgeside</h1>}
				<div>
					<form className="input-group mb-3" action="/soeg">
						<input
							type="text"
							className="form-control"
							placeholder="Søg her..."
							aria-label="Søgningsfelt"
							name="term"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button
							className="input-group-text"
							type="submit"
							id="button-addon2"
						>
							Søg <i className="ms-1 bi bi-search"></i>
						</button>
					</form>

					{props.response && props.response?.length == 0 && (
						<p>
							Ingen resultater for: <i>{props.term}</i>
						</p>
					)}
					{props.response && (
						<div className="search-grid">
							{props.response &&
								props.response.map((item: any, i: number) => {
									//console.log(item);
									//if (!item.fields.slug) return;
									//Lav godt link
									let link =
										item.categories?.nodes?.length > 0 &&
										item.categories.nodes[0]
											? item.categories.nodes[0].slug + "/" + item.slug
											: item.slug;

									return (
										<a key={i} href={link} className="d-flex flex-column">
											<h3>{item.title}</h3>
											{item.excerpt && (
												<span
													dangerouslySetInnerHTML={{ __html: item.excerpt }}
												/>
											)}
											<p className="fst-italic mt-auto">{link}</p>
										</a>
									);
								})}
						</div>
					)}
				</div>
			</section>
		</>
	);
}
/* WORDPRESS VERSION END */
