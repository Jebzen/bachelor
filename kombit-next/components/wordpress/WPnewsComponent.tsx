import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { WPSinglePage, WP_Page_Node } from "../../interfaces/WPIndexes";
import ShareButtons from "../general/ShareButtons";

interface prop {
	content: WP_Page_Node;
}

export default function WPnewsComponent({ content }: prop) {
	//console.log(content);
	return (
		<section className="container">
			<h1>{content.title}</h1>
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
			<div className="d-flex">
				<ShareButtons />
			</div>
			<small
				className="fst-italic"
				dangerouslySetInnerHTML={{ __html: content.excerpt }}
			/>
			<div
				dangerouslySetInnerHTML={{
					__html: content.content ? content.content : "",
				}}
			/>
		</section>
	);
}
