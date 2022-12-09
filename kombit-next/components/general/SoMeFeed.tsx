import { ReactElement, useEffect, useState } from "react";
import { GraphCatcher } from "../../data/GraphQL";
import { WPAllPagesLimitSort, WP_Page_Node } from "../../interfaces/WPIndexes";
import { client } from "../contenful/main";
import styles from "../../styles/Landing.module.css";

interface prop {
	version?: "CF" | "WP" | undefined;
}

export default function SoMeFeed({ version }: prop) {
	const [slide, setSlide] = useState("soMe");
	const [linkedin, setLinkedin] = useState([]);
	const [presse, setPresse] = useState<any | WP_Page_Node[]>([]);

	useEffect(() => {
		if (version == "CF" || version === undefined) {
			//Nyheder
			client
				.getEntries({
					content_type: "nyheder",
					limit: 3,
					order: "sys.createdAt",
				})
				.then((reponse: any) => {
					setPresse(reponse);
				});
		}
		if (version == "WP") {
			//Nyheder
			GraphCatcher.getAllPagesLimitSort("nyheder", 3).then(async (response) => {
				setPresse(response?.data?.pages?.nodes);
			});
		}
	}, []);

	return (
		<div className="row WPFeedHeader">
			<div
				className={
					slide == "soMe"
						? "col-4 newsHeader active activebox2 news"
						: "col-4 newsHeader"
				}
				onClick={() => setSlide("soMe")}>
				<h4>Sociale medier</h4>
			</div>
			<div
				className={
					slide == "presse"
						? "col-4 newsHeader active activebox2 news"
						: "col-4 newsHeader"
				}
				onClick={() => setSlide("presse")}>
				<h4>Presse</h4>
			</div>
			<div
				className={
					slide == "kontakt"
						? "col-4 newsHeader active activebox2 news"
						: "col-4 newsHeader"
				}
				onClick={() => setSlide("kontakt")}>
				<h4>Kontakt</h4>
			</div>
			<div className="col-12">
				<div className="row">
					<div className={slide == "soMe" ? "p-5 row" : "p-5 row d-none"}>
						<div className="col">
							<div className="p-2">
								<a
									className="twitter-timeline"
									data-height="1000"
									href="https://twitter.com/Jebzen_tweet?ref_src=twsrc%5Etfw">
									Tweets by Jebzen_tweet
								</a>{" "}
								<script
									async
									src="https://platform.twitter.com/widgets.js"
									charSet="utf-8"
									defer={true}></script>
							</div>
						</div>
						<div className="col">
							<div className="p-2">
								<iframe
									src="https://www.linkedin.com/embed/feed/update/urn:li:share:7001876340761075712"
									allowFullScreen={true}
									title="Embedded post"
									width="504"
									height="1000"
									className={styles.responsivIframe}
									frameBorder="5"></iframe>
							</div>
						</div>
					</div>
					{slide == "presse" && (
						<>
							{presse?.items &&
								presse.items.length != 0 &&
								presse.items.map((newss: any, i: number) => {
									return (
										<div className="col-4 content-column" key={i}>
											<a href={"/nyheder/" + newss.fields.slug}>
												<h5>{newss.fields.title}</h5>
											</a>
											<p>{newss.fields.abstrakt}</p>
											<p className="text-end">{newss.sys.createdAt}</p>
										</div>
									);
								})}
							{presse &&
								presse.length != 0 &&
								Array.isArray(presse) &&
								presse.map((item: WP_Page_Node, i: number) => {
									return (
										<div className="col-4 content-column" key={i}>
											<a href={"/nyheder/" + item.slug}>
												<h3>{item.title}</h3>
											</a>
											<span
												dangerouslySetInnerHTML={{ __html: item.excerpt }}
											/>
											<p className="text-end">{item.date}</p>
										</div>
									);
								})}
						</>
					)}
					{slide == "kontakt" && (
						<>
							<div className="col-12 content-column">
								<h5>Kontakt os på:</h5>
							</div>
							<div className="col-4 content-column">
								<p>Halfdansgade 8</p>
								<p>2300 København S</p>
							</div>
							<div className="col-4 content-column">
								<p>
									<a href="mailto:kombit@kombit.dk">kombit@kombit.dk</a>
								</p>
								<p>
									<a href="#">3334 9400</a>
								</p>
							</div>
							<div className="col-4 content-column">
								<p>
									Skriv til os ved at bruge vores{" "}
									<a href="/kontakt">kontakt formualr</a>
								</p>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
