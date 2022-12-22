import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "../../styles/Projekt.module.css";
import ShareButtons from "../general/ShareButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PageHero from "../general/PageHero";
import CFSectionCards from "./Sections/CFSectionCards";
import CFSectionLinks from "./Sections/CFSectionLinks";
import CFSectionLeder from "./Sections/CFSectionLeder";
import CFSectionTextBillede from "./Sections/CFSectionTextBillede";
import CFReferencer from "./CFReferencer";
import CFsektionLinksAndLeader from "./Sections/CFSectionLinksAndLeader";

export default function CFSections({ sections }: any) {
	console.log(sections);
	return (
		<>
			{sections && sections.length > 0 && (
				<div>
					{sections.map((sektion: any, i: number) => {
						console.log(sektion.sys.contentType.sys.id);

						if (sektion.sys.contentType.sys.id == "sektionCards") {
							return (
								<section className="col-12 kombit-section" key={i}>
									<CFSectionCards cards={sektion.fields.cards} />
								</section>
							);
						}

						if (sektion.sys.contentType.sys.id == "sektionLinks") {
							return (
								<section className="col-12 col-xl-8 kombit-section" key={i}>
									<CFSectionLinks links={sektion.fields.links} />
								</section>
							);
						}

						if (sektion.sys.contentType.sys.id == "sektionProjektLeder") {
							return (
								<section className="col-12 kombit-section" key={i}>
									<CFSectionLeder leader={sektion.fields?.projektlederen} />
								</section>
							);
						}

						if (sektion.sys.contentType.sys.id == "textBillede") {
							return (
								<section className="col-12 kombit-section" key={i}>
									<CFSectionTextBillede textB={sektion.fields} />
								</section>
							);
						}
						if (sektion.sys.contentType.sys.id == "sektionLinksAndLeader") {
							return (
								<section className="container section-container flex" key={i}>
									<CFsektionLinksAndLeader leader={sektion.fields} />
								</section>
							);
						}

						if (sektion.sys.contentType.sys.id == "referencer") {
							return (
								<section className="" key={i}>
									<CFReferencer content={sektion.fields.referencer} />
								</section>
							);
						}
					})}
				</div>
			)}
		</>
	);
}
