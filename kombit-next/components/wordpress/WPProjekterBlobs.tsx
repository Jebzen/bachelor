import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { WPAllPagesLimitSort, WP_Page_Node } from "../../interfaces/WPIndexes";

interface prop {
	projects: WP_Page_Node[];
}

export default function WPProjectBlobs({ projects }: prop) {
	//console.log(projects);

	//Contentful npm package søgning for ting
	//Contentful npm package documentToReactComponents

	return (
		<div className="row">
			{projects &&
				projects.map((item, i: number) => {
					return (
						<div key={i} className="col-12">
							<h3>{item.title}</h3>
							<span dangerouslySetInnerHTML={{ __html: item.excerpt }}></span>
						</div>
					);
				})}
		</div>
	);
}
