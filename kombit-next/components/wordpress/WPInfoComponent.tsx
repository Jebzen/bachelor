import { WPSinglePage } from "../../interfaces/WPIndexes";
import SoMeFeed from "../general/SoMeFeed";
import ShareButtons from "../general/ShareButtons";

interface prop {
	content: WPSinglePage;
}

export default function WPInfoComponent({ content }: prop) {
	console.log(content);
	if (!content.data?.page) return <></>;
	const { page } = content.data;

	return (
		<section className="container">
			<div className="d-flex flex-column">
				<h1>{page.title}</h1>
				{page.featuredImage && (
					<div className="text-center">
						<img
							src={page.featuredImage?.node?.mediaItemUrl}
							alt={page.featuredImage?.node?.altText}
						/>
					</div>
				)}
				<small dangerouslySetInnerHTML={{ __html: page.excerpt }} />

				<ShareButtons />
				<span dangerouslySetInnerHTML={{ __html: page.content }} />
				<SoMeFeed />
			</div>
		</section>
	);
}
