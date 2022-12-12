import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState } from "react";
import { CFEntryLanding } from "../../interfaces/CFentry";
import CFFeed from "./CFFeed";
import styles from "../../styles/Landing.module.css";
import PageHero from "../general/PageHero";

interface prop {
	content: CFEntryLanding;
}

export default function CFLandingComponent({ content }: prop) {
	const [slide, setSlide] = useState<any>(null);

	//console.log(slide);
	//console.log(content.fields.forretningschef);

	function changeSlide(event: any) {
		setSlide(content.fields.sider[event.currentTarget.dataset.id]);
	}

	return (
		<>
			<PageHero heading={content.fields.title} />
			<section className="container section-container">
				<div className="p-2 my-2">
					<h4 className={styles.HeaderFour}>
						PROJEKTER: TEKNIK, MILJØ & BORGERSERVICE
					</h4>
					<div className="row land">
						{content.fields.sider.map((side: any, i: number) => {
							return (
								<div
									key={i}
									data-id={i}
									className="col-2 landing"
									onClick={changeSlide}>
									<img
										src={side.fields.featuredImage.fields.file.url}
										className={styles.landingImg}
										alt={side.fields.featuredImage.fields.file.title}
									/>
									<div className={styles.flexDiv}>
										<p className="text-center">
											<b>{side.fields.title}</b>
										</p>
										<a
											className={styles.readMore}
											href={"/projekt/" + side.fields.slug}>
											Læs mere
										</a>
									</div>
								</div>
							);
						})}
						{slide !== null && (
							<div className="mt-2 open-projekt-box">
								<h3 className="fw-bold">{slide.fields.title}</h3>
								<div>{slide.fields.abstrakt}</div>
								<a
									href={"projekter/" + slide.fields.slug}
									className="d-flex justify-content-end">
									<p className="text-end">Læs mere</p>
								</a>
							</div>
						)}
					</div>
				</div>
				<div className="row landingInfoContainer">
					<div className="col-9 projektLanding">
						<h3>Mission</h3>
						{documentToReactComponents(content.fields.mission)}
					</div>
					<div className="col-3 projektLanding">
						<div className="d-flex justify-end flex-column forretningschef">
							<h4 className="text-end">Forretningschef</h4>
							<img
								className="img-fluid"
								src={content.fields.forretningschef.fields.file.url}
								alt={content.fields.forretningschef.fields.title}
							/>
							<p>{content.fields.forretningschef.fields.title}</p>
							<p className="respect-line">
								{content.fields.forretningschef.fields.description}
							</p>
						</div>
					</div>
					<div className="col-12">
						<CFFeed />
					</div>
				</div>
			</section>
		</>
	);
}
