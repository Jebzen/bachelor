import { useState } from "react";
import { WPPageCard, WPSinglePage } from "../../interfaces/WPIndexes";
import PageHero from "../general/PageHero";
import WPLandingFeed from "./WPLandingFeed";
import styles from "../../styles/Landing.module.css"

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
		<>
		<PageHero heading={content.title}/>
		<section className="container news">
			<div className="p-2 my-2">
			<h4 className={styles.HeaderFour}>PROJEKTER: TEKNIK, MILJØ & BORGERSERVICE</h4>

				{projekter && projekter.length > 0 && (
					<>
						<div className="row land">
							{projekter.map((item, i: number) => {
								return (
									<div
										key={i}
										data-id={i}
										className="col-2 landing"
										onClick={changeSlide}
									>
										<img
											src={item.data.page.featuredImage.node.mediaItemUrl}
											className={styles.landingImg}
											alt={item.data.page.featuredImage.node.altText}
										/>
										<div className={styles.flexDiv}><p className="text-center"><b>{item.data.page.title}</b></p>
										<a className={styles.readMore} href={"/projekt/" + item.data.page.slug}>
         Læs mere
        </a>
										</div>
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
			<div className="row landingInfoContainer">
				<div className="col-9 projektLanding">
					<span dangerouslySetInnerHTML={{ __html: content.content }} />
				</div>

				{kontakt_person && kontakt_person.data.mediaItem && (
					<>
						<div className="col-3 projektLanding">
							<div className="d-flex justify-end flex-column">
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
		</>
	);
}


