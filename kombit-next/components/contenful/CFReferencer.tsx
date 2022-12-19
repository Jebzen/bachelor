export default function CFReferencer({ content }: any) {
	//console.log(content.sys.contentType.sys.id);

	return (
		<div className="news-related">
			{content.map((reference: any) => (
				<>
					{reference.sys.contentType.sys.id == "nyheder" && (
						<div className="related">
							<a
								href={
									"/" +
									reference.sys.contentType.sys.id +
									"/" +
									reference.fields.slug
								}
							>
								<img
									src={reference.fields.banner.fields.file.url}
									alt={reference.fields.banner.fields.title}
									className="newsImg-related"
								/>
								<p className="small">
									Udgivet d. {reference.sys.createdAt.substring(0, 10)}
								</p>
								<h3>{reference.fields.title}</h3>
								<p>{reference.fields.abstrakt}</p>
							</a>
						</div>
					)}

					{reference.sys.contentType.sys.id == "landingpage" && (
						<div className="related">
							<a
								href={
									"/" +
									reference.sys.contentType.sys.id +
									"/" +
									reference.fields.slug
								}
							>
								<img
									src={reference.fields.media.fields.file.url}
									alt={reference.fields.media.fields.title}
									className="newsImg-related"
								/>
								<p className="small">
									Udgivet d. {reference.sys.createdAt.substring(0, 10)}
								</p>
								<h3>{reference.fields.title}</h3>
								<p>{reference.fields.abstrakt}</p>
							</a>
						</div>
					)}
				</>
			))}
		</div>
	);
}
