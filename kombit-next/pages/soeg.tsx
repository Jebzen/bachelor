import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import { client } from "../components/contenful/main";
import { IndexLayout } from "../layout";

export async function getServerSideProps(context: any) {
	const term =
		context.query.term && context.query.term != ""
			? context.query.term
			: null;
	//const term = context.term;

	let response = null;
	if (term) {
		response = await client.getEntries({ query: term });
		/*
		response.items = response.items.filter((entry: any) => {
			return (
				entry.sys.contentType.sys.id != "cardEmbeddedEntry" &&
				entry.sys.contentType.sys.id != "card" &&
				entry.sys.contentType.sys.id != "bannerCarousel"
			);
		});
        */
	}

	return {
		props: {
			term: term,
			response: response,
		},
	};
}

export default function Search(props: any) {
	console.log(props);

	return (
		<section className="container">
			<h1>Søgeside for alle entries</h1>
			{props.term && (
				<p>
					Søgte efter: <i>{props.term}</i>
				</p>
			)}
			{props.response?.items && props.response?.items.length == 0 && (
				<p>
					Ingen resultater for: <i>{props.term}</i>
				</p>
			)}
			{props.response?.items &&
				props.response.items.map((item: any, i: number) => {
					if (!item.fields.slug) return;
					//Lav godt link
					let link = item.fields.slug;
					if (item.sys.contentType.sys.id == "infoSide")
						link = "indhold/" + item.fields.slug;
					if (item.sys.contentType.sys.id == "nyheder")
						link = "nyheder/" + item.fields.slug;
					if (item.sys.contentType.sys.id == "projekt")
						link = "projekter/" + item.fields.slug;
					if (item.sys.contentType.sys.id == "kalender")
						link = "kalender/" + item.fields.slug;
					if (item.sys.contentType.sys.id == "landingPage")
						link = "landing/" + item.fields.slug;

					return (
						<div key={i}>
							<a href={link}>
								<h3>{item.fields.title}</h3>
							</a>
							{item.fields?.abstrakt?.nodeType == "document" &&
								documentToReactComponents(item.fields.abstrakt)}
							{item.fields?.abstrakt?.nodeType != "document" && (
								<p>{item.fields.abstrakt}</p>
							)}
						</div>
					);
				})}
		</section>
	);
}
