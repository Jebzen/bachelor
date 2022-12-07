import { useEffect, useState } from "react";
import { GraphCatcher } from "../../data/GraphQL";
import { WPAllPagesLimitSort, WP_Page_Node } from "../../interfaces/WPIndexes";

export default function WPLandingFeed() {
	const [slide, setSlide] = useState("nyheder");
	const [news, setNews] = useState<WP_Page_Node[]>([]);
	const [projects, setProjects] = useState<WP_Page_Node[]>([]);
	const [info, setInfo] = useState<WP_Page_Node[]>([]);

	useEffect(() => {
		//Nyheder
		GraphCatcher.getAllPagesLimitSort("nyheder", 3).then(async (response) => {
			if (!response?.data?.pages?.nodes) return;
			setNews(response.data.pages.nodes);
		});
		//Kalender
		GraphCatcher.getAllPagesLimitSort("projekt", 3).then(async (response) => {
			if (!response?.data?.pages?.nodes) return;
			setProjects(response.data.pages.nodes);
		});
		//Indhold
		GraphCatcher.getAllPagesLimitSort("infoside", 3).then(async (response) => {
			if (!response?.data?.pages?.nodes) return;
			setInfo(response.data.pages.nodes);
		});
	}, []);

	return (
		<div className="row WPFeedHeader">
			<div
				className={
					slide == "nyheder" ? "col-4 newsHeader active" : "col-4 newsHeader"
				}
				onClick={() => setSlide("nyheder")}
			>
				Nyheder
			</div>
			<div
				className={
					slide == "projekt" ? "col-4 newsHeader active" : "col-4 newsHeader"
				}
				onClick={() => setSlide("projekt")}
			>
				Projekter
			</div>
			<div
				className={
					slide == "viden" ? "col-4 newsHeader active" : "col-4 newsHeader"
				}
				onClick={() => setSlide("viden")}
			>
				Viden
			</div>
			<div className="col-12">
				<div className="row WPFeed">
					{slide == "nyheder" &&
						news &&
						news.length != 0 &&
						news.map((item, i: number) => {
							return (
								<div className="col-4 content-column" key={i}>
									<a href={"/nyheder/" + item.slug}>
										<h3>{item.title}</h3>
									</a>
									<span dangerouslySetInnerHTML={{ __html: item.excerpt }} />
									<p className="text-end">{item.date}</p>
								</div>
							);
						})}
					{slide == "projekt" &&
						projects &&
						projects.length != 0 &&
						projects.map((item: any, i: number) => {
							return (
								<div className="col-4 content-column" key={i}>
									<a href={"/projekt/" + item.slug}>
										<h3>{item.title}</h3>
									</a>
									<span dangerouslySetInnerHTML={{ __html: item.excerpt }} />
									<p className="text-end">{item.date}</p>
								</div>
							);
						})}
					{slide == "viden" &&
						info &&
						info.length != 0 &&
						info.map((item: any, i: number) => {
							return (
								<div className="col-4 content-column" key={i}>
									<a href={"/infoside/" + item.slug}>
										<h3>{item.title}</h3>
									</a>
									<span dangerouslySetInnerHTML={{ __html: item.excerpt }} />
									<p className="text-end">{item.date}</p>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}
