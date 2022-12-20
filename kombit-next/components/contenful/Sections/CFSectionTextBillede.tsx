import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "../../../styles/Projekt.module.css";
import ShareButtons from "../../general/ShareButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PageHero from "../../general/PageHero";
import { renderOption } from "../../../data/renderoption";

export default function CFSectionTextBillede({ textB }: any) {
	console.log(textB);

	if (textB.text && textB.billede) {
		return (
			<div className="container tb-section">
				<div className="secTwo">
					<div className="KcolOne">{documentToReactComponents(textB.text)}</div>
					<div className="text-center mansory featuredImage">
						<img
							src={textB.billede.fields.file.url}
							alt={textB.billede.fields.title}
						/>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="sectionOne">
				<div className="table-col">
					{documentToReactComponents(textB.text, renderOption)}
				</div>
			</div>
		);
	}
}
