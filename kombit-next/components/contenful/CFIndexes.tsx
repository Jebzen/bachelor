import { CFentry } from "../../interfaces/CFentry";
import styles from "../../styles/Projekt.module.css";

interface prop {
	nodes: CFentry[];
	parent: string;
}

export default function CFIndexes({ nodes, parent }: prop) {
	return (
		<>
			{nodes.map((item, i: number) => {
				//console.log(item);
				return (
					<a
						href={(parent ? parent : "") + "/" + item.fields.slug}
						className={`box-${i + 1} news-item`}
						key={i}
					>
						{item.fields.media && (
							<img
								src={item.fields.media.fields.file.url}
								alt={item.fields.media.fields.description}
								className="newsImg"
							/>
						)}
						{item.fields.banner && (
							<img
								src={item.fields.banner.fields.file.url}
								alt={item.fields.banner.fields.description}
								className="newsImg"
							/>
						)}
						<div className="related">
							<p className="small">
								Udgivet d. {item.sys.createdAt.substring(0, 10)}
							</p>
							<h3>{item.fields.title}</h3>
							<p>{item.fields.abstrakt}</p>{" "}
						</div>
					</a>
				);
			})}
		</>
	);
}
