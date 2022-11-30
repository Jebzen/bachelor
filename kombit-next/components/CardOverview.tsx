import { CFEntryProjekt } from "../interfaces/CFentry";
import styles from "../styles/Projekt.module.css";

interface prop {
	projekt: CFEntryProjekt;
	tab: any;
}

const CardOverview = ({ projekt, tab }: prop) => {
	//console.log(projekt);
	const { title, abstrakt, featuredImage, slug } = projekt.fields;

	return (
		<div>
			<div className={styles.cardImg}>
				<img src={"https:" + featuredImage.fields.file.url}></img>
			</div>
			<div className={styles.cardText}>
				<h3>{title}</h3>
				<p className="text">{abstrakt}</p>
				<a className="read-more" href={"/projekt/" + slug}>
					Read more
				</a>
			</div>
		</div>
	);
};

export default CardOverview;
