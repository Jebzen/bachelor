const ProjectCards = ({ item }: any) => {
	const { title, slug, cookingTime, thumbnail } = item.fields;
	//console.log(title);
	return <div>{title}</div>;
};

export default ProjectCards;
