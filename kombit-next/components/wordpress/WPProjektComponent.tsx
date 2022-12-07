import styles from "../../styles/Projekt.module.css";
import ShareButtons from "../general/ShareButtons";
import { WPSinglePage, WP_Page_Single } from "../../interfaces/WPIndexes";

interface prop {
	projekt: WP_Page_Single | null;
}

export default function WPProjektComponent({ projekt }: prop) {
	if (!projekt) return <></>;
	const { title, content, featuredImage, projekter } = projekt;

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
						<ShareButtons />
						<span dangerouslySetInnerHTML={{ __html: content }} />
					</div>
					<div>
						<img
							alt={title}
							src={featuredImage.node.mediaItemUrl}
							className={styles.columnsImg}
							width={500}
							height={500}
						/>
					</div>
				</div>
				{projekter && projekter.length > 0 && (
					<div className={styles.cardContainer}>
						{projekter.map((projekt, i: number) => {
							if (!projekt.data?.page) return;
							return (
								<div className={styles.card} key={i}>
									<div className={styles.cardHeader}>
										<h4>{projekt.data.page.title}</h4>
									</div>
									<span
										dangerouslySetInnerHTML={{
											__html: projekt.data.page.excerpt,
										}}
									/>
								</div>
							);
						})}
					</div>
				)}
				{
					//Links toDO
					/*<div>
					<>{documentToReactComponents(links)}</>
					</div>*/
				}
			</div>
		</>
	);
}
