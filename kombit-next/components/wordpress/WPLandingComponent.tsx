import { useState } from "react";
import { WPPageCard, WPSinglePage } from "../../interfaces/WPIndexes";
import ShareButtons from "../general/ShareButtons";
import WPLandingFeed from "./WPLandingFeed";

interface prop {
	content: WPSinglePage["data"]["page"];
}

export default function WPLandingComponent({ content }: prop) {
	const [slide, setSlide] = useState<any | null>(null);
	let { projekter, kontakt_person } = content;

	function changeSlide(event: any) {
		setSlide(projekter ? projekter[event.currentTarget.dataset.id] : null);
	}

	//console.log(person);

	return (
		<section className="container">
			<div className="p-2 my-2">
				{projekter && projekter.length > 0 && (
					<>
						<h1>{content.title}</h1>
						<h2>Projekter</h2>
						<div className="row projekt-area">
							{projekter.map((item, i: number) => {
								return (
									<div
										key={i}
										data-id={i}
										className="col-2"
										onClick={changeSlide}
									>
										<img
											src={item.data.page.featuredImage.node.mediaItemUrl}
											className="img-fluid"
											alt={item.data.page.featuredImage.node.altText}
										/>
										<p>{item.data.page.title}</p>
									</div>
								);
							})}
							{slide !== null && (
								<div className="mt-2 open-projekt-box">
									<h3 className="fw-bold">{slide.data.page.title}</h3>
									<div
										dangerouslySetInnerHTML={{
											__html: slide.data.page.excerpt,
										}}
									/>
									<a
										href={"projekter/" + slide.data.page.slug}
										className="d-flex justify-content-end"
									>
										<p className="text-end">Læs mere</p>
									</a>
								</div>
							)}
						</div>
					</>
				)}
			</div>
			<div className="row">
				<div className="col-9">
					<ShareButtons />
					<span dangerouslySetInnerHTML={{ __html: content.content }} />
				</div>

				{kontakt_person && kontakt_person.data.mediaItem && (
					<>
						<div className="col-3">
							<div className="d-flex justify-end flex-column forretningschef">
								<span
									className="text-end fs-4"
									dangerouslySetInnerHTML={{
										__html: kontakt_person.data.mediaItem.caption,
									}}
								/>
								<img
									className="img-fluid"
									src={kontakt_person.data.mediaItem.mediaItemUrl}
									alt={kontakt_person.data.mediaItem.altText}
								/>
								<p>{kontakt_person.data.mediaItem.title}</p>
								<span
									dangerouslySetInnerHTML={{
										__html: kontakt_person.data.mediaItem.description,
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
	);
}
