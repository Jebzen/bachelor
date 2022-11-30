import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useEffect, useState } from "react";
import { client } from "./main";

export default function CFFeed() {
	const [slide, setSlide] = useState("nyheder");
	const [news, setNews] = useState<any>([]);
	const [calender, setCalender] = useState<any>([]);
	const [info, setInfo] = useState<any>([]);

	useEffect(() => {
		//Nyheder
		client
			.getEntries({
				content_type: "nyheder",
				limit: 3,
				order: "sys.createdAt",
			})
			.then((reponse: any) => {
				setNews(reponse);
			});
		//Kalender
		client
			.getEntries({
				content_type: "kalender",
				limit: 3,
				order: "sys.createdAt",
			})
			.then((response: any) => {
				setCalender(response);
			});
		//Indhold
		client
			.getEntries({
				content_type: "infoSide",
				limit: 3,
				order: "sys.createdAt",
			})
			.then((response: any) => {
				setInfo(response);
			});
	}, []);

	return (
		<div className="row">
			<div
				className={
					slide == "nyheder" ? "col-4 newsHeader active" : "col-4 newsHeader"
				}
				onClick={() => setSlide("nyheder")}
			>
				<h4>Nyheder</h4>
			</div>
			<div
				className={
					slide == "kalender" ? " col-4 newsHeader active" : "col-4 newsHeader"
				}
				onClick={() => setSlide("kalender")}
			>
				<h4>Kalender</h4>
			</div>
			<div
				className={
					slide == "viden" ? " col-4 newsHeader active" : "col-4 newsHeader"
				}
				onClick={() => setSlide("viden")}
			>
				<h4>Viden</h4>
			</div>
			<div className="col-12">
				<div className="row">
					{slide == "nyheder" &&
						news?.items &&
						news.items.length != 0 &&
						news.items.map((newss: any, i: number) => {
							return (
								<div className="col-4 content-column" key={i}>
									<a href={newss.fields.slug}>
										<h5>{newss.fields.title}</h5>
									</a>
									<p>{newss.fields.abstrakt}</p>
									<p className="text-end">{newss.sys.createdAt}</p>
								</div>
							);
						})}
					{slide == "kalender" &&
						calender?.items &&
						calender.items.length != 0 &&
						calender.items.map((event: any, i: number) => {
							return (
								<div className="col-4 content-column" key={i}>
									<a href={"kalender/" + event.fields.slug}>
										<h5>{event.fields.title}</h5>{" "}
									</a>
									{documentToReactComponents(event.fields.abstrakt)}
									<p className="text-end">{event.sys.createdAt}</p>
								</div>
							);
						})}
					{slide == "viden" &&
						info?.items &&
						info.items.length != 0 &&
						info.items.map((infoSide: any, i: number) => {
							return (
								<div className="col-4" key={i}>
									<a href={"kalender/" + infoSide.fields.slug}>
										<h3>{infoSide.fields.title}</h3>
									</a>
									{documentToReactComponents(infoSide.fields.abstrakt)}
									<p className="text-end">{infoSide.sys.createdAt}</p>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}
