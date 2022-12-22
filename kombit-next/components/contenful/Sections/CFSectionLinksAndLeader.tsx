import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React from "react";
import styles from "../../../styles/Projekt.module.css";

export default function CFSectionTextBillede({ leader }: any) {
	//console.log(textB);

	return (
		<>
			{leader.links && (
				<div className="">
					<h3 className="fw-bold read-more mb-5">LINKS</h3>
					{documentToReactComponents(leader.links)}
				</div>
			)}
			{leader && (
				<div className="">
					<h3 className="fw-bold read-more text-center">Projektleder</h3>
					<div className="d-flex justify-content-center">
						<img
							src={leader.projektleder.fields.file.url}
							className={
								styles.columnsImgLink + " mb-2 bg-white projektlederLinks"
							}
							width={200}
							height={200}
						/>
					</div>
					<h3 className="center">{leader.projektleder.fields.title}</h3>
					<p className="white-pre center">
						{leader.projektleder.fields.description}
					</p>
				</div>
			)}
		</>
	);
}
