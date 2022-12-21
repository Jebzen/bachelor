import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { CFEntryKalender } from "../../interfaces/CFentry";
import PageHero from "../general/PageHero";
import ShareButtons from "../general/ShareButtons";
import styles from "../../styles/Calendar.module.css";
import CFSections from "./CFSections";

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
			<PageHero
				heading={content.fields.title}
				abstrakt={content.fields.abstrakt}
			/>
			<section className="container news">
				<div className="d-flex flex-column">
					<h2 className={styles.calendarNumber}>{content.fields.dato}</h2>
					<small className="fst-italic text-center"></small>
					<div className={"kalender-main"}>
						{documentToReactComponents(
							content.fields.beskrivelse,
							renderOption
						)}
					</div>
				</div>
				{content.fields.kontaktPerson && (
					<div className="contactPerson">
						<h4>Kontaktperson</h4>
						<img
							alt={content.fields.title}
							src={content.fields.kontaktPerson.fields.file.url}
							width={200}
							height={200}
						/>
						<h3>{content.fields.kontaktPerson.fields.title}</h3>
						<p className="white-pre">
							{content.fields.kontaktPerson.fields.description}
						</p>
					</div>
				)}
			</section>

			<CFSections sections={content.fields.sektioner} />
		</>
	);
}
