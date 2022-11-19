export default function ProjectBlobs({ projects }: any) {
	//console.log(projects);

	return (
		<>
			{projects.items &&
				projects.items.map((item: any, i: number) => {
					return (
						<span key={i}>
							<h3>{item.fields.title}</h3>
							<p>
								{item.fields.beskrivelse &&
									item.fields.beskrivelse.content.map(
										(beskrivelse: any, i: number) => {
											return (
												<span key={i}>
													<span>
														{beskrivelse.content.map(
															(
																content: any,
																i: number
															) => {
																return content.value;
															}
														)}
													</span>
												</span>
											);
										}
									)}
							</p>
						</span>
					);
				})}
		</>
	);
}
