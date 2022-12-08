import { useState } from "react";
import {
	WPPageCard,
	WPSinglePage,
	WP_Page_Single,
} from "../../interfaces/WPIndexes";
import ShareButtons from "../general/ShareButtons";
import WPLandingFeed from "./WPLandingFeed";

interface prop {
	content: WP_Page_Single;
}

export default function WPLandingComponent({ content }: prop) {
	console.log(content);
	const [slide, setSlide] = useState<
		any | null | WP_Page_Single["kombitFelter"]["projekt"]
	>(null);
	let { projekter, kontakt_person } = content;

	function changeSlide(event: any) {
		setSlide(
			content.kombitFelter.projekt
				? content.kombitFelter.projekt[event.currentTarget.dataset.id]
				: null
		);
	}

	//console.log(person);

	return (
		<section className="container">
			<div className="p-2 my-2">
				{content.kombitFelter.projekt &&
					content.kombitFelter.projekt.length > 0 && (
						<>
							<h1>{content.title}</h1>
							<h2>Projekter</h2>
							<div className="row projekt-area">
								{content.kombitFelter.projekt.map((item, i: number) => {
									return (
										<div
											key={i}
											data-id={i}
											className="col-2"
											onClick={changeSlide}
										>
											<img
												src={item.featuredImage.node.mediaItemUrl}
												className="img-fluid"
												alt={item.featuredImage.node.altText}
											/>
											<p>{item.featuredImage.node.title}</p>
										</div>
									);
								})}
								{slide !== null && (
									<div className="mt-2 open-projekt-box">
										<h3 className="fw-bold">{slide.title}</h3>
										<div
											dangerouslySetInnerHTML={{
												__html: slide.excerpt,
											}}
										/>
										<a
											href={"projekter/" + slide.slug}
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

				{content.kombitFelter.kontaktPerson && (
					<>
						<div className="col-3">
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
	);
}
