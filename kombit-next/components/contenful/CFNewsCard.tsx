export default function CFNewsCard({ content }: any) {
	return (
		<>
			<div className="news-related">


<div className="related">	<div></div><a href={"/projekt/" + content.fields.projekt.fields.slug}>	<img
src={content.fields.banner.fields.file.url}
alt={content.fields.banner.fields.title}
className="newsImg-related"
/>
<p className="small">Udgivet d. {content.fields.projekt.sys.createdAt.substring(0, 10)}</p>
	
			
				<h3>{content.fields.projekt.fields.title}</h3>
				
			
		<p>{content.fields.projekt.fields.abstrakt}</p>	</a>
	</div>
	


	</div>
		</>
	);
}
