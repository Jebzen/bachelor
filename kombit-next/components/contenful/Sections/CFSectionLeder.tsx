import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "../../../styles/Projekt.module.css";
import ShareButtons from "../../general/ShareButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PageHero from "../../general/PageHero";

export default function CFSectionLeder({ leader }: any) {
	//console.log(leader);

	return (
		<>
			{leader && (
				<div className="section-leader">
					<h3 className="fw-bold read-more text-center">Projektleder</h3>
					<div className="d-flex justify-content-center">
						<img
							src={leader.fields.file.url}
							className={styles.columnsImgLink + " mb-2 bg-white"}
							width={200}
							height={200}
						/>
					</div>
					<h3>{leader.fields.title}</h3>
					<p className="white-pre">{leader.fields.description}</p>
				</div>
			)}
		</>
	);
}
