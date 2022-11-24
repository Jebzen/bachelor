import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Accordion } from "react-bootstrap";
import SoMeFeed from "../Feed2";
import ShareButtons from "../ShareButtons";

export default function WPInfoComponent({ content }: any) {
	//console.log(content);

	return (
		<section className="container">
			<div className="d-flex flex-column">
				<h1>{content.title}</h1>
				{content.featuredImage && (
					<div className="text-center">
						<img
							src={content.featuredImage?.node?.mediaItemUrl}
							alt={content.featuredImage?.node?.altText}
						/>
					</div>
				)}
				<small dangerouslySetInnerHTML={{ __html: content.excerpt }} />

				<ShareButtons />
				<span dangerouslySetInnerHTML={{ __html: content.content }} />
				<SoMeFeed />
			</div>
		</section>
	);
}
