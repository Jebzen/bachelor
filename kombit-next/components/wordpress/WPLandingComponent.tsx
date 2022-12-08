import { useState } from "react";
import {
	WPPageCard,
	WPSinglePage,
	WP_Page_Single,
} from "../../interfaces/WPIndexes";
import ShareButtons from "../general/ShareButtons";
import WPLandingFeed from "./WPLandingFeed";
import styles from "../../styles/Landing.module.css";
import PageHero from "../general/PageHero";

interface prop {
	content: WP_Page_Single;
}

export default function WPLandingComponent({ content }: prop) {
	//console.log(content);

	const projekter = content.kombitFelter.projekt;

	//console.log(projekter);

	return (
		<>
			<PageHero heading={content.title} />
			<section className="container news">
				<div className="p-2 my-2">
					{projekter && projekter.length > 0 && (
						<>
							<h4 className={styles.HeaderFour}>Relateret projekter</h4>
							<div className="row land">
								{projekter.map((item, i: number) => {
									return (
										<div key={i} data-id={i} className="col-2 landing">
											<img
												src={item.featuredImage.node.mediaItemUrl}
												className={styles.landingImg}
												alt={item.featuredImage.node.altText}
											/>
											<div className={styles.flexDiv}>
												<p className="text-center">
													<b>{item.title}</b>
												</p>
												<a
													className={styles.readMore}
													href={"/projekt/" + item.slug}
												>
													Læs mere
												</a>
											</div>
										</div>
									);
								})}
							</div>
						</>
					)}
				</div>
				<div className="row landingInfoContainer">
					<div className="col-9 projektLanding">
						<span dangerouslySetInnerHTML={{ __html: content.content }} />
					</div>

					{content.kombitFelter.kontaktPerson && (
						<>
							<div className="col-3 projektLanding">
								<div className="d-flex justify-end flex-column forretningschef">
									<span
										className="text-end fs-4"
										dangerouslySetInnerHTML={{
											__html: content.kombitFelter.kontaktPerson.caption,
										}}
									/>
									<img
										className="img-fluid"
										src={content.kombitFelter.kontaktPerson.mediaItemUrl}
										alt={content.kombitFelter.kontaktPerson.altText}
									/>
									<p>{content.kombitFelter.kontaktPerson.title}</p>
									<span
										dangerouslySetInnerHTML={{
											__html: content.kombitFelter.kontaktPerson.description,
										}}
									/>
								</div>
							</div>
						</>
					)}

					<div className="col-12">
						<WPLandingFeed />
					</div>
				</div>
			</section>
		</>
	);
}
