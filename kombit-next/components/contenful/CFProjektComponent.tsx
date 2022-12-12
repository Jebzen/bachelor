import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "../../styles/Projekt.module.css";
import ShareButtons from "../general/ShareButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PageHero from "../general/PageHero";

export default function CFProjektComponent({ projekt }: any) {
	const {
		title,
		beskrivelse,
		featuredImage,
		links,
		cards,
		projektleder,
		projektlederInfo,
	} = projekt.fields;

	//console.log(projektleder.fields.description);

	return (
		<>
			<PageHero heading={title} subheader={"OM PROJEKTET"} />
			{projekt.metadata.tags && projekt.metadata.tags.length > 0 && (
				<div className="container mt-3">
					<p>
						Dette projekt er realteret til:{" "}
						{projekt.metadata.tags.map((tag: any, i: number) => {
							return (
								<>
									<a
										className="text-capitalize d-inline-flex mb-3 px-2 py-1 fw-semibold text-danger bg-danger bg-opacity-10 border border-danger border-opacity-10 rounded-2"
										href="/projekt">
										{tag.sys.id}
									</a>
								</>
							);
						})}
					</p>
				</div>
			)}
			<section className="container section-container">
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
					<div className="some">
						<p>Del projektet:</p>
						<ShareButtons />
					</div>
				</div>
			</section>
			{cards && cards.length > 0 && (
				<div className="cardContainer">
					{cards.map((item: any, index: any) => {
						return (
							<div>
								<div className={styles.card + ` container`} key={item.sys.id}>
									<div className={styles.cardHeader}>
										<h4 className="lh-base">{item.fields.titel}</h4>
									</div>
									{documentToReactComponents(item.fields.beskrivelse)}
								</div>
							</div>
						);
						// console.log(item.fields.titel);
						// this creates a wierd error

						// console.log(item.fields.beskrivelse);
						// return ;
						// return <ProjectCards key={item.sys.id} item={item} />;
					})}
					{/* <span
							aria-hidden="true"
							className="carousel-control-next-icon arrow"
						></span> */}
				</div>
			)}
			<section className="container section-container">
				{(links || projektleder) && (
					<div className={styles.linkSection}>
						<div className={styles.flex}>
							{links && (
								<div>
									<h3 className={styles.cardNumber}>LINKS</h3>
									{documentToReactComponents(links)}
									{!links && "Ingen links"}
									<></>
								</div>
							)}

							{projektleder && (
								<div>
									<h4>Projektleder</h4>
									<img
										alt={title}
										src={projektleder.fields.file.url}
										className={styles.columnsImgLink}
										width={200}
										height={200}
									/>
									<h3>{projektleder.fields.title}</h3>
									<p className="white-pre">{projektleder.fields.description}</p>
								</div>
							)}
						</div>
					</div>
				)}
			</section>
		</>
	);
}
