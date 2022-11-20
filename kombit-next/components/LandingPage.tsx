import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MouseEventHandler, useEffect, useReducer, useState } from "react";
import { client } from "./contenful/main";
import Feed from "./Feed";

export default function LandingPage({ content, children }: any) {
	const [slide, setSlide] = useState(null);

	console.log(slide);

	function changeSlide(event: any) {
		setSlide(content.fields.sider[event.currentTarget.dataset.id]);
	}

	return (
		<section className="container">
			<div className="p-2 my-2">
				<h2>Projekter</h2>
				<div className="row">
					{content.fields.sider.map((side: any, i: number) => {
						return (
							<div
								key={i}
								data-id={i}
								className="col-2"
								onClick={changeSlide}
							>
								<img
									src={
										side.fields.featuredImage.fields.file
											.url
									}
									className="img-fluid"
									alt={
										side.fields.featuredImage.fields.file
											.title
									}
								/>
								<p>{side.fields.title}</p>
							</div>
						);
					})}
					{slide !== null && (
						<div className="mt-2">
							<h3 className="fw-bold">{slide.fields.title}</h3>
							<div>{slide.fields.abstrakt}</div>
							<a href={"projekter/" + slide.fields.slug}>
								<p>Læs mere</p>
							</a>
						</div>
					)}
				</div>
			</div>
			<div className="row">
				<div className="col-8">
					{documentToReactComponents(content.fields.mission)}
				</div>
				<div className="col-4">
					<p>Test</p>
				</div>
				<div className="col-12">
					<Feed />
				</div>
			</div>
			{children}
		</section>
	);
}
