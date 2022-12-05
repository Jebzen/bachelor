import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState } from "react";
import { CFEntryLanding } from "../../interfaces/CFentry";
import ShareButtons from "../general/ShareButtons";
import CFFeed from "./CFFeed";

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
		<section className="container">
			<div className="p-2 my-2">
				<h1>{content.fields.title}</h1>
				<h2>Projekter</h2>
				<div className="row projekt-area">
					{content.fields.sider.map((side: any, i: number) => {
						return (
							<div key={i} data-id={i} className="col-2" onClick={changeSlide}>
								<img
									src={side.fields.featuredImage.fields.file.url}
									className="img-fluid"
									alt={side.fields.featuredImage.fields.file.title}
								/>
								<p>{side.fields.title}</p>
							</div>
						);
					})}
					{slide !== null && (
						<div className="mt-2 open-projekt-box">
							<h3 className="fw-bold">{slide.fields.title}</h3>
							<div>{slide.fields.abstrakt}</div>
							<a
								href={"projekter/" + slide.fields.slug}
								className="d-flex justify-content-end"
							>
								<p className="text-end">Læs mere</p>
							</a>
						</div>
					)}
				</div>
			</div>
			<div className="row">
				<div className="col-9">
					<ShareButtons />
					{documentToReactComponents(content.fields.mission)}
				</div>
				<div className="col-3">
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
	);
}
