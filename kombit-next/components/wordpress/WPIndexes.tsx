import { WPAllPages, WP_Page_Node } from "../../interfaces/WPIndexes";

interface prop {
	nodes: WP_Page_Node[];
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
						{item.featuredImage && (
							<img
								src={item.featuredImage?.node?.mediaItemUrl}
								alt={item.featuredImage?.node?.altText}
								className="newsImg"

							/>
						)}
						<div className="related">
						<a href={(parent ? parent : "") + "/" + item.slug}>	
						<p className="small">Udgivet d. {item.date.substring(0, 10)}</p>

						<h3>{item.title}</h3>
						<p><span dangerouslySetInnerHTML={{ __html: item.excerpt }} /></p>
						<a className="readMore" href={(parent ? parent : "") + "/" + item.slug}>
          Læs nyhed
        </a>
						</a>
						</div>
					</a>
				);
			})}
		</>


	);
}

