import { CFEntryProjekt } from "../../interfaces/CFentry";
import { WPAllPages, WP_Page_Node } from "../../interfaces/WPIndexes";
import styles from "../../styles/Projekt.module.css";

interface prop {
	projekt: WP_Page_Node;
}

const WPCardOverview = ({ projekt }: prop) => {
	//console.log(projekt);
	const { title, excerpt, featuredImage, slug } = projekt;

	return (
		<div>
			<div className={styles.cardImg}>
				<img src={featuredImage.node.mediaItemUrl}></img>
			</div>
			<div className={styles.cardText}>
				<h3>{title}</h3>
				<span className="text" dangerouslySetInnerHTML={{ __html: excerpt }} />
				<a className="read-more" href={"/projekt/" + slug}>
					Read more
				</a>
			</div>
		</div>
	);
};

export default WPCardOverview;
