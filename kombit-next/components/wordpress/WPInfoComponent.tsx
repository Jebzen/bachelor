import { WPSinglePage } from "../../interfaces/WPIndexes";
import SoMeFeed from "../general/SoMeFeed";
import ShareButtons from "../general/ShareButtons";
import PageHero from "../general/PageHero";

interface prop {
	content: WPSinglePage;
}

export default function WPInfoComponent({ content }: prop) {
	console.log(content);
	if (!content.data?.page) return <></>;
	const { page } = content.data;

	return (
		<>
			<PageHero heading={page.title} />
			<section className="container section-container">
				<div className="d-flex flex-column">
					{page.featuredImage && (
						<div className="text-center">
							<img
								src={page.featuredImage?.node?.mediaItemUrl}
								alt={page.featuredImage?.node?.altText}
								className="featured-img"
							/>
						</div>
					)}
					<small dangerouslySetInnerHTML={{ __html: page.excerpt }} />

					<span dangerouslySetInnerHTML={{ __html: page.content }} />
					<ShareButtons />

					<SoMeFeed />
				</div>
			</section>
		</>
	);
}
