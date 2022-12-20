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
				content_type: "infoside",
				limit: 3,
				order: "sys.createdAt",
			})
			.then((response: any) => {
				setInfo(response);
			});
	}, []);

	return (
		<>
			<h3 className="my-4">Læs mere</h3>
			<div className="row CFFeedHeader">
				<div
					className={
						slide == "nyheder"
							? "col-4 newsHeader activebox2 news"
							: "col-4 newsHeader"
					}
					onClick={() => setSlide("nyheder")}
				>
					<h4>Nyheder</h4>
				</div>
				<div
					className={
						slide == "kalender"
							? " col-4 newsHeader activebox2 kalender"
							: "col-4 newsHeader"
					}
					onClick={() => setSlide("kalender")}
				>
					<h4>Kalender</h4>
				</div>
				<div
					className={
						slide == "viden"
							? " col-4 newsHeader activebox2 viden"
							: "col-4 newsHeader"
					}
					onClick={() => setSlide("viden")}
				>
					<h4>Viden</h4>
				</div>
				<div className="col-12">
					<div className="row content-row CFFeed">
						{slide == "nyheder" &&
							news?.items &&
							news.items.length != 0 &&
							news.items.map((newss: any, i: number) => {
								return (
									<div className="col-4 content-column" key={i}>
										<a href={"nyheder/" + newss.fields.slug}>
											<h5>{newss.fields.title}</h5>
										</a>
										<p>{newss.fields.abstrakt}</p>
										<p className="text-end">
											{newss.sys.createdAt.substring(0, 10)}
										</p>
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
										<p className="text-end">
											{event.sys.createdAt.substring(0, 10)}
										</p>
									</div>
								);
							})}
						{slide == "viden" &&
							info?.items &&
							info.items.length != 0 &&
							info.items.map((infoSide: any, i: number) => {
								console.log(infoSide);
								return (
									<div className="col-4 content-column" key={i}>
										<a href={"infoside/" + infoSide.fields.slug}>
											<h3>{infoSide.fields.title}</h3>
										</a>

										{infoSide.fields.abstrakt}
										<p className="text-end">
											{infoSide.sys.createdAt.substring(0, 10)}
										</p>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</>
	);
}
