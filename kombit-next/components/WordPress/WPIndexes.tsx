import { WPAllPages } from "../../interfaces/WPIndexes";

interface prop {
	nodes: WPAllPages["data"]["pages"]["nodes"];
	parent: string;
}

export default function WPIndexes({ nodes, parent }: prop) {
	return (
		<>
			{nodes.map((item: any, i: number) => {
				return (
					<a
						href={(parent ? parent : "") + "/" + item.slug}
						className={`box-${i + 1} news-item`}
						key={i}
					>
						<h2>{item.title}</h2>
						<small className="fst-italic">{item.date}</small>
						<span dangerouslySetInnerHTML={{ __html: item.excerpt }} />
						{item.featuredImage && (
							<img
								src={item.featuredImage?.node?.mediaItemUrl}
								alt={item.featuredImage?.node?.altText}
							/>
						)}
					</a>
				);
			})}
		</>
	);
}
