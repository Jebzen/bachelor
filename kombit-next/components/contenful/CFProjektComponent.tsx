import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "../../styles/Projekt.module.css";
import ShareButtons from "../general/ShareButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PageHero from "../general/PageHero";
import CFSections from "./CFSections";
import CFFeed from "./CFFeed";

export default function CFProjektComponent({ projekt }: any) {
	const {
		title,
		beskrivelse,
		featuredImage,
		links,
		cards,
		projektleder,
		projektlederInfo,
		sektioner,
	} = projekt.fields;

	//console.log(projektleder.fields.description);

	return (
		<>
			<PageHero heading={title} subheader={"OM PROJEKTET"} />

			{projekt.metadata.tags && projekt.metadata.tags.length > 0 && (
				<div className="container mt-3">
					<p>
						Dette projekt er realteret til:{" "}
						{projekt.metadata.tags.map((tag: any, i: number) => {
							return (
								<a
									className="kombit-badge bg-danger bg-opacity-10 border border-danger border-opacity-10"
									href={"/projekt?tag=" + tag.sys.id}
									key={i}>
									{tag.sys.id}
								</a>
							);
						})}
					</p>
				</div>
			)}

			<section className="container section-container">
				<div className={styles.columns}>
					<div>{documentToReactComponents(beskrivelse)}</div>
					<div>
						<img
							alt={title}
							src={featuredImage.fields.file.url}
							className={styles.columnsImg}
							width={500}
							height={500}
						/>
					</div>
					<div className="some">
						<p>Del projektet:</p>
						<ShareButtons />
					</div>
				</div>
			</section>

			<CFSections sections={sektioner} />
		</>
	);
}
