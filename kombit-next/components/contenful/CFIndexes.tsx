import { CFentry } from "../../interfaces/CFentry";

interface prop {
	nodes: CFentry[];
	parent: string;
}

export default function CFIndexes({ nodes, parent }: prop) {
	return (
		<>
			{nodes.map((item, i: number) => {
				console.log(item);
				return (
					<a
						href={(parent ? parent : "") + "/" + item.fields.slug}
						className={`box-${i + 1} news-item`}
						key={i}
					>
						<h2>{item.fields.title}</h2>
						<small className="fst-italic">{item.sys.createdAt}</small>
						<p>{item.fields.abstrakt}</p>
						{item.fields.media && (
							<img
								src={item.fields.media.fields.file.url}
								alt={item.fields.media.fields.description}
							/>
						)}
						{item.fields.banner && (
							<img
								src={item.fields.banner.fields.file.url}
								alt={item.fields.banner.fields.description}
							/>
						)}
					</a>
				);
			})}
		</>
	);
}
