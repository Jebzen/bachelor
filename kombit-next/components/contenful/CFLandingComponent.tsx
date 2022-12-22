import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState } from "react";
import { CFEntryLanding } from "../../interfaces/CFentry";
import CFFeed from "./CFFeed";
import styles from "../../styles/Landing.module.css";
import PageHero from "../general/PageHero";
import CFReferencer from "./CFReferencer";
import CFSections from "./CFSections";

interface prop {
	content: CFEntryLanding;
}

export default function CFLandingComponent({ content }: any) {
	const [slide, setSlide] = useState<any>(null);

	//console.log(content);

	function changeSlide(event: any) {
		setSlide(content.fields.sider[event.currentTarget.dataset.id]);
	}

	return (
		<>
			<PageHero heading={content.fields.title} />
			<section className="container section-container">
				<div className="row landingInfoContainer">
					<div className="col-9 ">
						<h3>Mission</h3>
						{documentToReactComponents(content.fields.mission)}
					</div>
					<div className="col-3 ">
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
				</div>
			</section>

			<CFSections sections={content.fields.sektioner} />

			<div className="container section-container">
				<CFFeed />
			</div>
		</>
	);
}
