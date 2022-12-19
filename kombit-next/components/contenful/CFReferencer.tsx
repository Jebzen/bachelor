export default function CFReferencer({ content }: any) {
	//console.log(content.sys.contentType.sys.id);

	switch (content.sys.contentType.sys.id) {
		case "nyheder":
			return (
				<>
					<div className="news-related">
						<div className="related">
							<div></div>
							<a href={content.sys.contentType.sys.id + content.fields.slug}>
								<img
									src={content.fields.banner.fields.file.url}
									alt={content.fields.banner.fields.title}
									className="newsImg-related"
								/>
								<p className="small">
									Udgivet d. {content.sys.createdAt.substring(0, 10)}
								</p>
								<h3>{content.fields.title}</h3>
								<p>{content.fields.abstrakt}</p>
							</a>
						</div>
					</div>
				</>
			);
			break;
		case "landingpage":
			return <></>;
			break;
		case "infoside":
			return <></>;
			break;
		case "kalender":
			return <></>;
			break;
		case "projekt":
			return <></>;
			break;
		default:
			return <></>;
	}
}
