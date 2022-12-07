import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Accordion } from "react-bootstrap";
import SoMeFeed from "../general/SoMeFeed";
import ShareButtons from "../general/ShareButtons";
import { CFEntryIndhold } from "../../interfaces/CFentry";
import PageHero from "../general/PageHero";

interface prop {
	content: CFEntryIndhold;
}

export default function CFInfoComponent({ content }: prop) {
	//console.log(content);

	const renderOption = {
		renderNode: {
			"embedded-asset-block": (node: any, children: any) => {
				return (
					<div className="text-center mansory">
						<img src={node.data.target.fields.file.url} width="100%" className=" images" />
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
		<>
		<PageHero heading={content.fields.title} abstrakt={content.fields.abstrakt}/>
		<section className="container news info">
			<div className="d-flex flex-column">
				<div className="featuredImage">{content.fields.media && (
					<div className="text-center">
						<img
							src={content.fields.media.fields.file.url}
							alt={content.fields.media.fields.title}
							className="featuredImage-img" 
						/>
					</div>
				)}</div>
							

				<div className="beskrivelse-news">{documentToReactComponents(content.fields.beskrivelse, renderOption)}</div>
				</div>

						</section>

				<div className="galleri">{documentToReactComponents(content.fields.billedeGalleri, renderOption)}</div>
				<section className="container news">

								{documentToReactComponents(content.fields.sectionTo, renderOption)}


				
				
				<SoMeFeed />
				</section>
		</>
	);
}
