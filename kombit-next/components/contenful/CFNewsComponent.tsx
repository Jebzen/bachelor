import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ShareButtons from "../general/ShareButtons";
import CFNewsCard from "./CFNewsCard";

export default function CFNewsComponent({ content }: any) {
	console.log(content);
	return (
		<>
			<hr />
			<section className="container news">
				<p className="small-grey">
					Udgivet d. {content.sys.createdAt.substring(0, 10)}
				</p>
				<h1 className="news-header">{content.fields.title}</h1>
				<p className="fst-italic text-center">
					<small>{content.fields.abstrakt}</small>
				</p>
				<div className="text-center">
					<img
						src={content.fields.banner.fields.file.url}
						alt={content.fields.banner.fields.title}
						className="img-fluid"
					/>
				</div>
				<div className="beskrivelse-news">
					{documentToReactComponents(content.fields.indhold)}
					<div className="some">
						<p>Del artiklen:</p>
						<ShareButtons />
					</div>
				</div>
			</section>
			<div className="more-news">
				{content.fields.projekt && (
					<>
						<h3 className="text-center news-h3">Måske du også kan lide</h3>
						<CFNewsCard content={content} />
					</>
				)}
			</div>
		</>
	);
}
