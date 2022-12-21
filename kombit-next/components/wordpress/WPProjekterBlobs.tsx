import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState } from "react";
import WPCardOverview from "./WPCardOverview";
import styles from "../../styles/Projekt.module.css";
import { WP_Page_Node } from "../../interfaces/WPIndexes";

interface prop {
	item: WP_Page_Node;
}

export default function WPProjectBlobs({ item }: prop) {
	//console.log(item);
	const [showTag, setShowTag] = useState(true);
	const [showTagHover, setShowTagHover] = useState(true);

	//console.log(item);

	return (
		<>
			{item.tags.nodes.map((tag: any) => {
				//console.log(tag);
				return (
					<div className={styles.cardBody}>
						<WPCardOverview
							projekt={item}
							tag={tag}
							showTag={showTag}
							showTagHover={showTagHover}
						/>
					</div>
				);
			})}
		</>
	);
}
