import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Accordion } from "react-bootstrap";
import SoMeFeed from "../general/SoMeFeed";
import ShareButtons from "../general/ShareButtons";
import { CFEntryIndhold } from "../../interfaces/CFentry";

interface prop {
	content: CFEntryIndhold;
}

export default function CFInfoComponent({ content }: prop) {
	//console.log(content);

	const renderOption = {
		renderNode: {
			"embedded-asset-block": (node: any, children: any) => {
				return (
					<div className="text-center">
						<img src={node.data.target.fields.file.url} className="img-fluid" />
					</div>
				);
			},
			//Lav dette til collapable
			"embedded-entry-inline": (node: any, children: any) => {
				{
					return (
						<>
							<span className="fs-3">{node.data.target.fields.title}</span>
							<br />
							<span>{node.data.target.fields.text}</span>
						</>
					);
				}
			},
		},
	};

	return (
		<section className="container">
			<div className="d-flex flex-column">
				<h1>{content.fields.title}</h1>
				{content.fields.media && (
					<div className="text-center">
						<img
							src={content.fields.media.fields.file.url}
							alt={content.fields.media.fields.title}
						/>
					</div>
				)}
				<small className="fst-italic">{content.fields.abstrakt}</small>

				<ShareButtons />
				{documentToReactComponents(content.fields.beskrivelse, renderOption)}
				<SoMeFeed />
			</div>
		</section>
	);
}
