import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ShareButtons from "../general/ShareButtons";
import CFNewsCard from "./CFNewsCard";
import CFReferencer from "./CFReferencer";

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
			{content.fields.sektioner &&
				content.fields.sektioner.length > 0 &&
				content.fields.sektioner.map((sektion: any) => {
					if (
						sektion.sys.contentType.sys.id == "referencer" &&
						sektion.fields?.referencer.length > 0
					) {
						return (
							<div className="more-news">
								<h3 className="text-center news-h3">Måske du også kan lide</h3>
								{sektion.fields.referencer &&
									sektion.fields.referencer.map((reference: any) => (
										<>
											<CFReferencer content={reference} />
										</>
									))}
							</div>
						);
					}
				})}
		</>
	);
}
