import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useEffect, useState } from "react";
import { GraphCatcher } from "../../data/GraphQL";
import { client } from "../contenful/main";

type entry = {};

export default function WPLandingFeed() {
	const [slide, setSlide] = useState("nyheder");
	const [news, setNews] = useState<[] | any[]>([]);
	const [projects, setProjects] = useState<[] | any[]>([]);
	const [info, setInfo] = useState<[] | any[]>([]);

	useEffect(() => {
		//Nyheder
		GraphCatcher.getAllPagesLimitSort("nyheder", 3).then(async (response) => {
			setNews(response.data.pages.nodes);
		});
		//Kalender
		GraphCatcher.getAllPagesLimitSort("projekt", 3).then(async (response) => {
			setProjects(response.data.pages.nodes);
		});
		//Indhold
		GraphCatcher.getAllPagesLimitSort("infoside", 3).then(async (response) => {
			setInfo(response.data.pages.nodes);
		});
	}, []);

	return (
		<div className="row">
			<div
				className={slide == "nyheder" ? "bg-info col-4 p-2" : "col-4 p-2"}
				onClick={() => setSlide("nyheder")}
			>
				Nyheder
			</div>
			<div
				className={slide == "projekt" ? "bg-info col-4 p-2" : "col-4 p-2"}
				onClick={() => setSlide("projekt")}
			>
				Projekter
			</div>
			<div
				className={slide == "viden" ? "bg-info col-4 p-2" : "col-4 p-2"}
				onClick={() => setSlide("viden")}
			>
				Viden
			</div>
			<div className="col-12">
				<div className="row">
					{slide == "nyheder" &&
						news &&
						news.length != 0 &&
						news.map((item: any, i: number) => {
							return (
								<div className="col-4" key={i}>
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
								<div className="col-4" key={i}>
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
								<div className="col-4" key={i}>
									<a href={"/infoSide/" + item.slug}>
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
