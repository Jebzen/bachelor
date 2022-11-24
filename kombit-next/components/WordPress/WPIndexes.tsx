export default function WPIndexes({ nodes, parent }: any) {
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
