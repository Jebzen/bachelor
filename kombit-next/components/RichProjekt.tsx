export default function RichTextProject({ prop }: any) {
	console.log(prop.content);

	prop.content.forEach((item: any) => {
		console.log(item);
	});

	return (
		<>
			{prop.content.map((item: any) => {
				return (
					<>
						{item.content.map((itemValue: any) => {
							return <p>{itemValue.value}</p>;
						})}
					</>
				);
			})}
		</>
	);
}
