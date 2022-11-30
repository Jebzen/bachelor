import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function CFProjectBlobs({ projects }: any) {
	//console.log(projects);

	//Contentful npm package søgning for ting
	//Contentful npm package documentToReactComponents

	return (
		<>
			{projects.items &&
				projects.items.map((item: any, i: number) => {
					return (
						<span key={i}>
							<h3>{item.fields.title}</h3>
							<>
								{item.fields.beskrivelse &&
									documentToReactComponents(item.fields.beskrivelse)}
							</>
						</span>
					);
				})}
		</>
	);
}
