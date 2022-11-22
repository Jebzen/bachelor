import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../components/contenful/main";
import { IndexLayout } from "../layout";
import { useEffect, useState } from "react";

export async function getServerSideProps(context: any) {
	const term =
		context.query.term && context.query.term != ""
			? context.query.term
			: null;
	//const term = context.term;

	let response = null;
	if (term) {
		response = await client.getEntries({
			query: term,
		});
		response.items = response.items.filter((entry: any) => {
			return (
				entry.sys.contentType.sys.id != "cardEmbeddedEntry" &&
				entry.sys.contentType.sys.id != "card" &&
				entry.sys.contentType.sys.id != "bannerCarousel" &&
				entry.sys.contentType.sys.id != "forside"
			);
		});
	}

	return {
		props: {
			term: term,
			response: response,
		},
	};
}

export default function Search(props: any) {
	const [searchTerm, setSearchTerm] = useState(props.term ? props.term : "");
	console.log(props);

	return (
		<>
			<Head>
				<title>
					{props.term ? "Søger efter: " + props.term : "Søgning"}
				</title>
			</Head>
			<section className="container h-100">
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

					{props.response?.items &&
						props.response?.items.length == 0 && (
							<p>
								Ingen resultater for: <i>{props.term}</i>
							</p>
						)}
					{props.response?.items && (
						<div className="search-grid">
							{props.response?.items &&
								props.response.items.map(
									(item: any, i: number) => {
										//if (!item.fields.slug) return;
										//Lav godt link
										let link = item?.sys?.contentType?.sys
											?.id
											? item.sys.contentType.sys.id +
											  "/" +
											  item.fields.slug
											: item.fields.slug;

										return (
											<a
												key={i}
												href={link}
												className="d-flex flex-column"
											>
												<h3>{item.fields.title}</h3>
												{item.fields?.abstrakt
													?.nodeType == "document" &&
													documentToReactComponents(
														item.fields.abstrakt
													)}
												{item.fields?.abstrakt
													?.nodeType !=
													"document" && (
													<p>
														{item.fields.abstrakt}
													</p>
												)}
												<p className="fst-italic mt-auto">
													{link}
												</p>
											</a>
										);
									}
								)}
						</div>
					)}
				</div>
			</section>
		</>
	);
}
