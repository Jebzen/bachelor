export default function CFReferencer({ content }: any) {
	//console.log(content.sys.contentType.sys.id);

	//Content er arrayet af reference
	//Content bliver mappet til "reference" hver
	//Reference har en "reference.sys.contentType.sys.id" property som er hvilken content model det er
	//Det er her hvor media,banner,featured-image værdierne er anderledes og har brug for hver sit punkt
	//Linje 15 er hvor jeg logger hver reference ud, hvor du kan se hvad hvert reference indeholder

	return (
		<div className="news-related">
			{content.map((reference: any) => {
				//Hvad indeholder referencen
				console.group("Reference");
				console.log(reference); //Indhold
				console.log(reference.sys?.contentType?.sys?.id); //Content model;
				console.groupEnd();
				console.log(reference);

				return (
					<>
						{reference.sys?.contentType?.sys?.id == "nyheder" && (
							<div className="related">
								<a
									href={
										"/" +
										reference.sys.contentType.sys.id +
										"/" +
										reference.fields.slug
									}>
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

						{reference.sys?.contentType?.sys?.id == "landingpage" && (
							<div className="related">
								<a
									href={
										"/" +
										reference.sys.contentType.sys.id +
										"/" +
										reference.fields.slug
									}>
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

						{reference.sys?.contentType?.sys?.id == "infoside" && (
							<div className="related">test</div>
						)}

						{reference.sys?.contentType?.sys?.id == "kalender" && (
							<div className="related">test</div>
						)}

						{reference.sys?.contentType?.sys?.id == "projekt" && (
							<div className="related">test</div>
						)}
					</>
				);
			})}
		</div>
	);
}
