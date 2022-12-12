import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Accordion } from "react-bootstrap";
import SoMeFeed from "../general/SoMeFeed";
import ShareButtons from "../general/ShareButtons";
import { CFEntryIndhold } from "../../interfaces/CFentry";
import PageHero from "../general/PageHero";
import styles from "../../styles/Projekt.module.css";

interface prop {
	content: CFEntryIndhold | any;
}

export default function CFInfoComponent({ content }: prop) {
	//console.log(content);

	const renderOption = {
		renderNode: {
			"embedded-asset-block": (node: any, children: any) => {
				return (
					<div className="text-center mansory featuredImage">
						<img
							src={node.data.target.fields.file.url}
							width="100%"
							className=" images"
						/>
					</div>
				);
			},
			//Lav dette til collapable
			"embedded-entry-inline": (node: any, children: any) => {
				{
					return (
						<>
							<span className="fs-3">{node.data.target.fields.title}</span>
							<br />
							<span>{node.data.target.fields.text}</span>
						</>
					);
				}
			},
		},
	};

	return (
		<>
			<PageHero
				heading={content.fields.title}
				abstrakt={content.fields.abstrakt}
			/>
			<section className="container section-container info">
				<div className="d-flex flex-column">
					<div className="featuredImage">
						{content.fields.media && (
							<div className="text-center">
								<img
									src={content.fields.media.fields.file.url}
									alt={content.fields.media.fields.title}
									className="featuredImage-img"
								/>
							</div>
						)}
					</div>
					<div className="beskrivelse-news ">
						{documentToReactComponents(
							content.fields.beskrivelse,
							renderOption
						)}
					</div>
				</div>
			</section>
			{content.fields.sektioner &&
				content.fields.sektioner.length > 0 &&
				content.fields.sektioner.map((sektion: any, i: number) => {
					if (sektion.fields.text && sektion.fields.billede) {
						return (
							<div className="container tb-section" key={i}>
								<div className="secTwo">
									<div className="colOne">
										{documentToReactComponents(sektion.fields.text)}
									</div>
									<div className="text-center mansory featuredImage">
										<img
											src={sektion.fields.billede.fields.file.url}
											alt={sektion.fields.billede.fields.title}
										/>
									</div>
								</div>
							</div>
						);
					} else {
						return (
							<div className="sectionOne" key={i}>
								<div className="table-col">
									{documentToReactComponents(sektion.fields.text, renderOption)}
								</div>
							</div>
						);
					}
				})}
			{/*{content.fields.sectionTo && (
				<div className="sectionOne">
					<div className="table-col">
						{documentToReactComponents(content.fields.sectionTo, renderOption)}
					</div>
				</div>
			)}
			{content.fields.overskift && (
				<div className="text-center">
					<h2>{content.fields.overskift}</h2>
				</div>
			)}
			<section className="container news con2">
				{content.fields.sectionFire && content.fields.section1Billede && (
					<div className="secTwo">
						<div className="colOne">
							{documentToReactComponents(content.fields.sectionFire)}
						</div>
						<div className="text-center mansory featuredImage">
							<img
								src={content.fields.section1Billede.fields.file.url}
								alt={content.fields.section1Billede.fields.title}
							/>
						</div>
					</div>
				)}
				{content.fields.section2Billede && content.fields.sectionFem && (
					<div className="secTree">
						<div className="text-center mansory featuredImage">
							<img
								src={content.fields.section2Billede.fields.file.url}
								alt={content.fields.section2Billede.fields.title}
							/>
						</div>
						<div className="colOne">
							{documentToReactComponents(content.fields.sectionFem)}
						</div>
					</div>
				)}
				<div className={`text-center`}></div>
			</section>
			{content.fields.sectionSeks && (
				<div className={styles.specialMargin + ` ` + `sectionOne`}>
					<div className="table-col">
						{documentToReactComponents(content.fields.sectionSeks)}
					</div>
				</div>
			)}*/}
			<div className="container section-container">
				<SoMeFeed />
			</div>
		</>
	);
}
