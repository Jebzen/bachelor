import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ShareButtons from "./ShareButtons";

export default function NewsComponent({ content }: any) {
	return (
		<section className="container">
			<h1>{content.fields.title}</h1>
			<div className="text-center">
				<img
					src={content.fields.banner.fields.file.url}
					alt={content.fields.banner.fields.title}
					className="img-fluid"
				/>
			</div>
			{content.fields.projekt && (
				<p>
					<span>Relatered til: </span>
					<span>
						<a
							href={
								"/projekter/" +
								content.fields.projekt.fields.slug
							}
						>
							{content.fields.projekt.fields.title}
						</a>
					</span>
				</p>
			)}
			<div className="d-flex">
				<ShareButtons />
			</div>
			<p className="fst-italic">
				<small>{content.fields.abstrakt}</small>
			</p>
			{documentToReactComponents(content.fields.indhold)}
		</section>
	);
}
