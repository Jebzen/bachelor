import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Accordion } from "react-bootstrap";

export default function InfoComponent({ content }: any) {
	console.log(content);

	const NoPara = {
		renderNode: {
			paragraph: (node: any, children: any) => {
				console.log(node);
				return <>test</>;
			},
		},
	};

	const renderOption = {
		renderNode: {
			"embedded-asset-block": (node: any, children: any) => {
				return (
					<div className="text-center">
						<img
							src={node.data.target.fields.file.url}
							className="img-fluid"
						/>
					</div>
				);
			},
			//Lav dette til collapable
			"embedded-entry-inline": (node: any, children: any) => {
				console.log(node);
				{
					return (
						<>
							<span className="fs-3">
								{node.data.target.fields.title}
							</span>
							<br />
							<span>{node.data.target.fields.text}</span>
						</>
					);
				}
			},
		},
	};
	return (
		<section className="container">
			<h1>{content.fields.title}</h1>
			{content.fields.media && (
				<div className="text-center">
					<img
						src={content.fields.media.fields.file.url}
						alt={content.fields.media.fields.title}
					/>
				</div>
			)}
			<small className="fsw-italic">{content.fields.abstrakt}</small>
			{documentToReactComponents(
				content.fields.beskrivelse,
				renderOption
			)}
		</section>
	);
}
