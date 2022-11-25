import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MouseEventHandler, useEffect, useReducer, useState } from "react";
import { client } from "../contenful/main";
import Feed from "../Feed";
import WPLandingFeed from "./WPLandingFeed";

export default function WPLandingComponent({
	content,
	person,
	projekter,
}: any) {
	const [slide, setSlide] = useState<any | null>(null);

	function changeSlide(event: any) {
		setSlide(projekter[event.currentTarget.dataset.id]);
	}

	//console.log(person);

	return (
		<section className="container">
			<div className="p-2 my-2">
				{projekter && projekter.length > 0 && (
					<>
						<h2>Projekter</h2>
						<div className="row">
							{projekter.map((item: any, i: number) => {
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
								<div className="mt-2">
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
					<span dangerouslySetInnerHTML={{ __html: content.content }} />
				</div>

				{person && person.data.mediaItem && (
					<>
						<div className="col-3">
							<div className="d-flex justify-end flex-column">
								<span
									className="text-end fs-4"
									dangerouslySetInnerHTML={{
										__html: person.data.mediaItem.caption,
									}}
								/>
								<img
									className="img-fluid"
									src={person.data.mediaItem.mediaItemUrl}
									alt={person.data.mediaItem.altText}
								/>
								<p>{person.data.mediaItem.title}</p>
								<span
									dangerouslySetInnerHTML={{
										__html: person.data.mediaItem.description,
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
