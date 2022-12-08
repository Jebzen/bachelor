import { useEffect, useState } from "react";
import { GraphCatcher } from "../../data/GraphQL";
import { WPAllPagesLimitSort, WP_Page_Node } from "../../interfaces/WPIndexes";

export default function WPLandingFeed() {
	const [slide, setSlide] = useState("nyheder");
	const [news, setNews] = useState<any[]>([]);
	const [projects, setProjects] = useState<any[]>([]);
	const [info, setInfo] = useState<any[]>([]);

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
					slide == "nyheder"
						? "col-4 newsHeader active activebox2 news"
						: "col-4 newsHeader"
				}
				onClick={() => setSlide("nyheder")}
			>
				<h5>Nyheder</h5>
			</div>
			<div
				className={
					slide == "projekt"
						? "col-4 newsHeader active activebox2 news"
						: "col-4 newsHeader"
				}
				onClick={() => setSlide("projekt")}
			>
				<h5>Projekter</h5>
			</div>
			<div
				className={
					slide == "viden"
						? "col-4 newsHeader active activebox2 news"
						: "col-4 newsHeader"
				}
				onClick={() => setSlide("viden")}
			>
				<h5>Viden</h5>
			</div>
			<div className="col-12">
				<div className="row WPFeed content-row">
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

{
	/* <div className="row">
<div
  className={
	slide == "nyheder" ? "col-4 newsHeader activebox2 news" : "col-4 newsHeader"
  }
  onClick={() => setSlide("nyheder")}
>
  <h4>Nyheder</h4>
</div>
<div
  className={
	slide == "kalender" ? " col-4 newsHeader activebox2 kalender" : "col-4 newsHeader"
  }
  onClick={() => setSlide("kalender")}
>
  <h4>Kalender</h4>
</div>
<div
  className={
	slide == "viden" ? " col-4 newsHeader activebox2 viden" : "col-4 newsHeader"
  }
  onClick={() => setSlide("viden")}
>
  <h4>Viden</h4>
</div>
<div className="col-12">
  <div className="row content-row">
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
);
} */
}
