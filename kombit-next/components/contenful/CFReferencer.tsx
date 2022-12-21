import { useEffect, useState } from "react";
import { client } from "./main";

export default function CFReferencer({ content }: any) {
	//console.log(content);

	//Content er arrayet af reference
	//Content bliver mappet til "reference" hver
	//Reference har en "reference.sys.contentType.sys.id" property som er hvilken content model det er
	//Det er her hvor media,banner,featured-image værdierne er anderledes og har brug for hver sit punkt

	const [referencer, setReferencer] = useState<any | any[]>([]);

	useEffect(() => {
		Promise.all(
			content.map((element: any) => {
				return client.getEntry(element.sys.id);
			})
		).then((results: any) => {
			setReferencer(results);
		});
	}, []);

	//console.log(referencer);

	return (
		<>
			{referencer && referencer.length > 0 && (
				<>
					<div className="container">
						<h3>Relatered historier:</h3>
					</div>
					<div className="news-related">
						{referencer.map((reference: any, i: number) => {
							return (
								<div key={i}>
									{reference.sys?.contentType?.sys?.id == "nyheder" && (
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

									{reference.sys?.contentType?.sys?.id == "landingpage" && (
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

									{reference.sys?.contentType?.sys?.id == "infoside" && (
										<div className="related">test</div>
									)}

									{reference.sys?.contentType?.sys?.id == "kalender" && (
										<div className="related">test</div>
									)}

									{reference.sys?.contentType?.sys?.id == "projekt" && (
										<div className="related">test</div>
									)}
								</div>
							);
						})}
					</div>
				</>
			)}
		</>
	);
}
