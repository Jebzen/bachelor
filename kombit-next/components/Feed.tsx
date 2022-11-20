import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useEffect, useState } from "react";
import { client } from "./contenful/main";

export default function Feed() {
	const [slide, setSlide] = useState("nyheder");
	const [news, setNews] = useState([]);
	const [calender, setCalender] = useState([]);

	useEffect(() => {
		client
			.getEntries({
				content_type: "nyheder",
				limit: 3,
				order: "sys.createdAt",
			})
			.then((reponse: any) => {
				setNews(reponse);
				console.log(reponse);
			});
		client
			.getEntries({
				content_type: "kalender",
				limit: 3,
				order: "sys.createdAt",
			})
			.then((response: any) => {
				setCalender(response);
				console.log(response);
			});
	}, []);

	return (
		<div className="row">
			<div
				className={slide == "nyheder" ? "bg-info col-4" : "col-4"}
				onClick={() => setSlide("nyheder")}
			>
				Nyheder
			</div>
			<div
				className={slide == "kalender" ? "bg-info col-4" : "col-4"}
				onClick={() => setSlide("kalender")}
			>
				Kalender
			</div>
			<div
				className={slide == "viden" ? "bg-info col-4" : "col-4"}
				onClick={() => setSlide("viden")}
			>
				Viden
			</div>
			<div className="col-12">
				<div className="row">
					{slide == "nyheder" &&
						news?.items &&
						news.items.length != 0 &&
						news.items.map((newss: any, i: number) => {
							return (
								<div className="col-4" key={i}>
									<a href={newss.fields.slug}>
										<h3>{newss.fields.title}</h3>
									</a>
									<p>{newss.fields.abstrakt}</p>
									<p className="text-end">
										{newss.sys.createdAt}
									</p>
								</div>
							);
						})}
					{slide == "kalender" &&
						calender?.items &&
						calender.items.length != 0 &&
						calender.items.map((event: any, i: number) => {
							return (
								<div className="col-4" key={i}>
									<a href={"kalender/" + event.fields.slug}>
										<h3>{event.fields.title}</h3>
									</a>
									{documentToReactComponents(
										event.fields.abstrakt
									)}
									<p className="text-end">
										{event.sys.createdAt}
									</p>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}
