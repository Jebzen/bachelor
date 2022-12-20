export const renderOption = {
	renderNode: {
		"embedded-asset-block": (node: any, children: any) => {
			return (
				<div className="text-center mansory featuredImage">
					<img
						src={node.data.target.fields.file.url}
						width="100%"
						className=" images"
					/>
				</div>
			);
		},
		//Lav dette til collapable
		"embedded-entry-inline": (node: any, children: any) => {
			{
				return (
					<>
						<span className="fs-3">{node.data.target.fields.title}</span>
						<br />
						<span>{node.data.target.fields.text}</span>
					</>
				);
			}
		},
	},
};
