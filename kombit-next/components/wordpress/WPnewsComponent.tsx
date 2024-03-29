import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
	WPSinglePage,
	WP_Page_Node,
	WP_Page_Single,
} from "../../interfaces/WPIndexes";
import ShareButtons from "../general/ShareButtons";
import WPNewsCard from "./WPNewsCard";

interface prop {
	content: WP_Page_Single;
}

export default function WPnewsComponent({ content }: prop) {
	//console.log(content);
	return (
		<>
			<hr />

			<section className="container section-container news">
				<p className="small-grey">Udgivet d. {content.modified} </p>
				<h1 className="news-header">{content.title}</h1>
				<small
					className="fst-italic text-center"
					dangerouslySetInnerHTML={{ __html: content.excerpt }}
				></small>
				<div className="text-center">
					<img
						src={content.featuredImage?.node?.mediaItemUrl}
						alt={content.featuredImage?.node?.altText}
						className="img-fluid"
					/>
				</div>
				{/*content.fields.projekt && (
				<p>
					<span>Relatered til: </span>
					<span>
						<a href={"/projekter/" + content.fields.projekt.fields.slug}>
							{content.fields.projekt.fields.title}
						</a>
					</span>
				</p>
			)*/}

				<div />
				<div className="beskrivelse-news">
					<span dangerouslySetInnerHTML={{ __html: content.content }} />
					<div className="some">
						<p>Del artiklen:</p>
						<ShareButtons />
					</div>
				</div>
			</section>
			<div className="news-header">
				<>
					<h3 className="text-center news-h3">Måske du også kan lide</h3>
				</>
				<WPNewsCard content={content} />
			</div>
		</>
	);
}
