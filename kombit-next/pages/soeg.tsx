import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../components/contenful/main";
import { IndexLayout } from "../layout";
import { useEffect, useState } from "react";

export async function getServerSideProps(context: any) {
	const term =
		context.query.term && context.query.term != "" ? context.query.term : null;
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

	const reduced = response.items.map((item: any) => {
		return {
			slug: item?.sys?.contentType?.sys?.id
				? item.sys.contentType.sys.id + "/" + item.fields.slug
				: item.fields.slug,
			title: item.fields.title,
			abstrakt: item.fields.abstrakt,
			abstrakt_type:
				item.fields.abstrakt.nodeType != undefined
					? item.fields.abstrakt.nodeType
					: null,
		};
	});
	//console.log(reduced);

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

export default function Search(props: any) {
	const [searchTerm, setSearchTerm] = useState(props.term ? props.term : "");
	//console.log(props.reduced);

	return (
		<>
			<Head>
				<title>{props.term ? "Søger efter: " + props.term : "Søgning"}</title>
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

					{props.reduced && props.reduced?.length == 0 && (
						<p>
							Ingen resultater for: <i>{props.term}</i>
						</p>
					)}

					<div className="search-grid">
						{props.reduced &&
							props.reduced.map((item: any, i: number) => {
								//console.log(item);
								return (
									<a key={i} href={item.slug} className="d-flex flex-column">
										<h3>{item.title}</h3>
										{item.abstrakt_type == "document" &&
											documentToReactComponents(item.abstrakt)}
										{item.abstrakt_type != "document" && <p>{item.abstrakt}</p>}
									</a>
								);
							})}
					</div>
				</div>
			</section>
		</>
	);
}
