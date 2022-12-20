import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "../../../styles/Projekt.module.css";
import ShareButtons from "../../general/ShareButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PageHero from "../../general/PageHero";

export default function CFSectionLinks({ links }: any) {
	//console.log(links);

	return (
		<>
			{links && (
				<div className="link-section">
					<h3 className="fw-bold read-more mb-5">Læs mere:</h3>
					{documentToReactComponents(links)}
				</div>
			)}
		</>
	);
}
