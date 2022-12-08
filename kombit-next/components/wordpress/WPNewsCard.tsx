export default function WPNewsCard({ content }: any) {
	return (
		<>
			<div className="news-related">
				<div className="related">
					{" "}
					<div></div>
					<a href="#">
						{" "}
						<img
							src={content.featuredImage?.node?.mediaItemUrl}
							alt={content.featuredImage?.node?.altText}
							className="newsImg-related"
						/>
						<p className="small">Udgivet d. </p>
						<h3>card titel</h3>
						<p>card abstrakt</p>{" "}
					</a>
				</div>
			</div>
		</>
	);
}
