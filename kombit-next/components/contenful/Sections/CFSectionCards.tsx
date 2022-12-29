import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "../../../styles/Projekt.module.css";
import ShareButtons from "../../general/ShareButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import PageHero from "../../general/PageHero";
import { client } from "../main";

export default function CFSectionCards({ cards }: any) {
	//console.log(cards);

	const [referencer, setReferencer] = useState<any | any[]>([]);

	useEffect(() => {
		Promise.all(
			cards.map((element: any) => {
				return client.getEntry(element.sys.id);
			})
		).then((results: any) => {
			setReferencer(results);
		});
	}, []);

	return (
		<>
			{referencer && referencer.length > 0 && (
				<div className="cardContainer my-4">
					{referencer.map((item: any, index: any) => {
						return (
							<div className={styles.card} key={index}>
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
