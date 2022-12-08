import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { CFEntryKalender } from "../../interfaces/CFentry";
import PageHero from "../general/PageHero";
import ShareButtons from "../general/ShareButtons";
import styles from "../../styles/Calendar.module.css";



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
		<>
			<PageHero heading={content.fields.title} abstrakt={documentToReactComponents(content.fields.abstrakt, renderOption)}/>
			<section className="container news">
				<div className="d-flex flex-column">
					<h2 className={styles.calendarNumber} >
					{content.fields.dato}

					</h2>
					<small className="fst-italic text-center">
						
					</small>
					<div className={"kalender-main"}>
						{documentToReactComponents(content.fields.beskrivelse, renderOption)}
					</div>
				</div>
			</section>
		</>

	);
}
