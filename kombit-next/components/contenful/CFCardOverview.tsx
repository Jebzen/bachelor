import { CFEntryProjekt } from "../../interfaces/CFentry";
import styles from "../../styles/Projekt.module.css";
import { useEffect, useState } from "react";

interface prop {
	projekt: CFEntryProjekt;
	tag?: any;
	showTag?: any;
	showTagHover?: any;
}

const CFCardOverview = ({ projekt, tag, showTag, showTagHover }: prop) => {
	//console.log(projekt);
	const { title, abstrakt, featuredImage, slug } = projekt.fields;

	const [isHovering, setIsHovering] = useState(false);

	const handleMouseOver = () => {
		if (showTagHover) {
			setIsHovering(true);
		}
	};

	const handleMouseOut = () => {
		if (showTagHover) {
			setIsHovering(false);
		}
		//console.log(isHovering);
	};

	return (
		<div onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
			{isHovering && showTag ? (
				<h3 className={styles.tagActive}>{tag.sys.id}</h3>
			) : null}

			<div className={styles.cardImg}>
				<img src={"https:" + featuredImage.fields.file.url}></img>
			</div>

			<div className={styles.cardText}>
				<h3>{title}</h3>

				<p className="text">{abstrakt}</p>
				<a className="read-more" href={"/projekt/" + slug}>
					Læs mere
				</a>
			</div>
		</div>
	);
};

export default CFCardOverview;
