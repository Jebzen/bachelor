import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState } from "react"
import WPCardOverview from "./WPCardOverview";
import styles from "../../styles/Projekt.module.css"

export default function WPProjectBlobs({ item }: any) {
	//console.log(projects);
const [showTag, setShowTag] = useState(true);
const [showTagHover, setShowTagHover] = useState(true);

	//Contentful npm package søgning for ting
	//Contentful npm package documentToReactComponents
	console.log(item)

	return (
		<>
			<div className={styles.cardBody}>
 			  <WPCardOverview projekt={item}  />
 			</div>
		</>
	);
}

// const [showTag, setShowTag] = useState(true);
// const [showTagHover, setShowTagHover] = useState(true);


// //console.log(projects);

// //Contentful npm package søgning for ting
// //Contentful npm package documentToReactComponents
// return (
//   <>
// 	{projects.items &&
// 	  projects.items.map((item: any, i: number) => {
// 		console.log(item);

// 		return item.metadata.tags.map((tag: any, i: number) => {
// 		  return (
// 			<div className={styles.cardBody} key={i}>
// 			  {/* <h3> {tag.sys.id}</h3> */}
// 			  <CFCardOverview projekt={item} tag={tag} showTag={showTag} showTagHover={showTagHover} />
// 			</div>
// 		  );
// 		});
// 	  })}
//   </>
// );
// }

