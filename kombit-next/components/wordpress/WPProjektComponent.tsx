import styles from "../../styles/Projekt.module.css";
import ShareButtons from "../general/ShareButtons";
import { WPSinglePage, WP_Page_Single } from "../../interfaces/WPIndexes";
import PageHero from "../general/PageHero";

interface prop {
	projekt: WP_Page_Single | null;
}

export default function WPProjektComponent({ projekt }: prop) {
	if (!projekt) return <></>;
	const { title, content, featuredImage, kombitFelter } = projekt;

	return (
		<>
			<PageHero heading={title} subheader={"OM PROJEKTET"} />
			<section className="container section-container">
				<div className={styles.columns}>
					<span dangerouslySetInnerHTML={{ __html: content }} />
					<div>
						<img
							alt={title}
							src={featuredImage.node.mediaItemUrl}
							className={styles.columnsImg}
							width={500}
							height={500}
						/>
					</div>
					<div className="some">
						<p>Del projektet:</p>
						<ShareButtons />
					</div>
				</div>
			</section>

			{kombitFelter.projekt && kombitFelter.projekt.length > 0 && (
				<div className={styles.cardContainer}>
					{kombitFelter.projekt.map((projekt, i: number) => {
						return (
							<div className={styles.card} key={i}>
								<div className={styles.cardHeader}>
									<h4>{projekt.title}</h4>
								</div>
								<span
									dangerouslySetInnerHTML={{
										__html: projekt.excerpt,
									}}
								/>
							</div>
						);
					})}
				</div>
			)}
			<section className="container section-container">
				{
					//Links toDO
					/*<div>
					<>{documentToReactComponents(links)}</>
					</div>*/
				}
			</section>
		</>
	);
}
