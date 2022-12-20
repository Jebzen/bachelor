import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "../../../styles/Projekt.module.css";
import ShareButtons from "../../general/ShareButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PageHero from "../../general/PageHero";

export default function CFSectionCards({ cards }: any) {
	//console.log(cards);

	return (
		<>
			{cards && cards.length > 0 && (
				<div className="cardContainer my-4">
					{cards.map((item: any, index: any) => {
						return (
							<div className={styles.card + ` container`} key={index}>
								<div className={styles.cardHeader}>
									<h4 className="lh-base">{item.fields.titel}</h4>
								</div>
								{documentToReactComponents(item.fields.beskrivelse)}
							</div>
						);
						// console.log(item.fields.titel);
						// this creates a wierd error

						// console.log(item.fields.beskrivelse);
						// return ;
						// return <ProjectCards key={item.sys.id} item={item} />;
					})}
				</div>
			)}
		</>
	);
}
