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
						<h3>Relaterede historier:</h3>
					</div>
					<div className="news-related container section-container">
						{referencer.map((reference: any, i: number) => {
							return (
								<>
									{reference.sys?.contentType?.sys?.id == "nyheder" && (
										<a
											href={
												"/" +
												reference.sys.contentType.sys.id +
												"/" +
												reference.fields.slug
											}
											className={` news-item`}
											key={i}>
											<img
												src={reference.fields.banner.fields.file.url}
												alt={reference.fields.banner.fields.title}
												className="newsImg"
											/>

											<div className="related">
												<p className="small">
													Udgivet d. {reference.sys.createdAt.substring(0, 10)}
												</p>
												<h3>{reference.fields.title}</h3>
												<p>{reference.fields.abstrakt}</p>
											</div>
										</a>
									)}

									{reference.sys?.contentType?.sys?.id == "landingpage" && (
										<a
											href={
												"/" +
												reference.sys.contentType.sys.id +
												"/" +
												reference.fields.slug
											}
											className={` news-item`}
											key={i}>
											<img
												src={reference.fields.media.fields.file.url}
												alt={reference.fields.media.fields.title}
												className="newsImg"
											/>
											<div className="related">
												<p className="small">
													Udgivet d. {reference.sys.createdAt.substring(0, 10)}
												</p>
												<h3>{reference.fields.title}</h3>
												<p>{reference.fields.abstrakt}</p>
											</div>
										</a>
									)}

									{reference.sys?.contentType?.sys?.id == "infoside" && (
										<a
											href={
												"/" +
												reference.sys.contentType.sys.id +
												"/" +
												reference.fields.slug
											}
											className={` news-item`}
											key={i}>
											<img
												src={reference.fields.media.fields.file.url}
												alt={reference.fields.media.fields.title}
												className="newsImg"
											/>
											<div className="related">
												<p className="small">
													Udgivet d. {reference.sys.createdAt.substring(0, 10)}
												</p>
												<h3>{reference.fields.title}</h3>
												<p>{reference.fields.abstrakt}</p>
											</div>
										</a>
									)}

									{reference.sys?.contentType?.sys?.id == "kalender" && (
										<a
											href={
												"/" +
												reference.sys.contentType.sys.id +
												"/" +
												reference.fields.slug
											}
											className={` news-item`}
											key={i}>
											<div className="related">
												<p className="small">
													Udgivet d. {reference.sys.createdAt.substring(0, 10)}
												</p>
												<h3>{reference.fields.title}</h3>
												<p>{reference.fields.abstrakt}</p>
											</div>
										</a>
									)}

									{reference.sys?.contentType?.sys?.id == "projekt" && (
										<a
											href={
												"/" +
												reference.sys.contentType.sys.id +
												"/" +
												reference.fields.slug
											}
											className={` news-item`}
											key={i}>
											<img
												src={reference.fields.featuredImage.fields.file.url}
												alt={reference.fields.featuredImage.fields.title}
												className="newsImg"
											/>
											<div className="related">
												<p className="small">
													Udgivet d. {reference.sys.createdAt.substring(0, 10)}
												</p>
												<h3>{reference.fields.title}</h3>
												<p>{reference.fields.abstrakt}</p>
											</div>
										</a>
									)}
								</>
							);
						})}
					</div>
				</>
			)}
		</>
	);
}
