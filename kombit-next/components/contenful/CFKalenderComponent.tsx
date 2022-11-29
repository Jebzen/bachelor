import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { CFEntryKalender } from "../../interfaces/CFentry";
import ShareButtons from "../general/ShareButtons";

interface prop {
	content: CFEntryKalender;
}

export default function CFKalenderComponent({ content }: prop) {
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
				<h1>
					{content.fields.title} - {content.fields.dato}
				</h1>
				<small>
					{documentToReactComponents(content.fields.abstrakt, renderOption)}
				</small>
				<div className="kalender-main">
					{documentToReactComponents(content.fields.beskrivelse, renderOption)}
				</div>
			</div>
		</section>
	);
}
