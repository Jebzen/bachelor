import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "../../styles/Projekt.module.css";
import ShareButtons from "../general/ShareButtons";

export default function CFProjektComponent({ projekt }: any) {
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
					<div>
						{documentToReactComponents(beskrivelse)}
					</div>
					<div>
						<img
							alt={title}
							src={featuredImage.fields.file.url}
							className={styles.columnsImg}
							width={500}
							height={500}
						/>

					</div>
					<div className="some"><p>Del projektet:</p><ShareButtons /></div>

				</div>


				{cards && cards.length > 0 && (
					<div className={styles.cardContainer}>
						{cards.map((item: any, index: any) => {
							console.log(index)
							return (
								<div className={styles.card} key={item.sys.id}>
									<h3 className={styles.cardNumber}>{`0${index + 1} `}</h3>
									<div className={styles.cardHeader}>
										<h4>{item.fields.titel}</h4>
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
						<span
							aria-hidden="true"
							className="carousel-control-next-icon arrow"
						></span>
					</div>
				)}
				<div className={styles.linkSection}>
					<div  className={styles.cardContainer}>
					<>{documentToReactComponents(links)}</>

					</div>
				</div>
			</div>
		</>
	);
}
