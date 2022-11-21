import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "../styles/Projekt.module.css";

export default function ProjektComponent({ projekt }: any) {
	const { title, beskrivelse, featuredImage, links, cards } = projekt.fields;
	console.log(projekt);
	return (
		<>
			<div className={styles.pageContainer}>
				<div className={styles.hero}>
					<div className={styles.insideHero}>
						<h1 className={styles.single}>{title}</h1>
						<h2>OM PROJEKTET</h2>
					</div>
				</div>
				<div className={styles.columns}>
					<div>{documentToReactComponents(beskrivelse)}</div>
					<div>
						<img
							alt={title}
							src={featuredImage.fields.file.url}
							className={styles.columnsImg}
							width={500}
							height={500}
						/>
					</div>
				</div>
				<div className={styles.cardContainer}>
					{cards.map((item: any) => {
						return (
							<div className={styles.card} key={item.sys.id}>
								<div className={styles.cardHeader}>
									<h4>{item.fields.titel}</h4>
								</div>
								{documentToReactComponents(
									item.fields.beskrivelse
								)}
							</div>
						);
						// console.log(item.fields.titel);
						// this creates a wierd error

						// console.log(item.fields.beskrivelse);
						// return ;
						// return <ProjectCards key={item.sys.id} item={item} />;
					})}
					<span
						aria-hidden="true"
						className="carousel-control-next-icon arrow"
					></span>
				</div>
				<div>
					<>{documentToReactComponents(links)}</>
				</div>
			</div>
		</>
	);
}
