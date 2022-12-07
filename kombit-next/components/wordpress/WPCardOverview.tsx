import { CFEntryProjekt } from "../../interfaces/CFentry";
import { WPAllPages } from "../../interfaces/WPIndexes";
import styles from "../../styles/Projekt.module.css";
import { useState } from "react"


interface prop {
	projekt: WPAllPages["data"]["pages"]["nodes"][0];
}

const WPCardOverview = ({ projekt, tag, showTag, showTagHover }: prop) => {
	//console.log(projekt);
	const { title, excerpt, featuredImage, slug } = projekt;

	const [isHovering, setIsHovering] = useState(false);
  
	const handleMouseOver = () => {
	  if (showTagHover) {
		setIsHovering(true);
  
	  }
	};
  
	const handleMouseOut = () => {
	  if(showTagHover) {
		setIsHovering(false);
  
	  }
	  //console.log(isHovering);
	};

	return (
		<div  onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
				{isHovering && showTag ? (
		  <h3 className={styles.tagActive}>{tag.name}</h3>
		) : null}
  
			<div className={styles.cardImg}>
				<img src={featuredImage.node.mediaItemUrl}></img>
			</div>
			<div className={styles.cardText}>
				<h3>{title}</h3>
				<span className="text" dangerouslySetInnerHTML={{ __html: excerpt }} />
				<a className="read-more" href={"/projekt/" + slug}>
				Læs mere				</a>
			</div>
		</div>
	);
};

export default WPCardOverview;



// const CFCardOverview = ({ projekt, tag, showTag, showTagHover }: prop) => {
// 	//console.log(projekt);
// 	const { title, abstrakt, featuredImage, slug } = projekt.fields;
  
// 	const [isHovering, setIsHovering] = useState(false);
  
// 	const handleMouseOver = () => {
// 	  if (showTagHover) {
// 		setIsHovering(true);
  
// 	  }
// 	};
  
// 	const handleMouseOut = () => {
// 	  if(showTagHover) {
// 		setIsHovering(false);
  
// 	  }
// 	  //console.log(isHovering);
// 	};
  
// 	return (
// 	  <div onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
// 		{isHovering && showTag ? (
// 		  <h3 className={styles.tagActive}>{tag.sys.id}</h3>
// 		) : null}
  
// 		<div className={styles.cardImg}>
// 		  <img src={"https:" + featuredImage.fields.file.url}></img>
// 		</div>
// 		<div className={styles.cardText}>
// 		  <h3>{title}</h3>
  
// 		  <p className="text">{abstrakt}</p>
// 		  <a className="read-more" href={"/projekt/" + slug}>
// 		   Læs mere
// 		  </a>
// 		</div>
// 	  </div>
// 	);
//   };
  
//   export default CFCardOverview;
  