export default function NewsCards({ news }: any) {
	//console.log(news);

	return (
		<>
			{news.items &&
				news.items
					.sort((a: any, b: any) => {
						return (
							new Date(b.sys.createdAt).getTime() -
							new Date(a.sys.createdAt).getTime()
						);
					})
					.map((news: any, i: number) => {
						return (
							<section key={i}>
								<h3>{news.fields.title}</h3>
								<p>{news.fields.abstrakt}</p>
							</section>
						);
					})}
		</>
	);
}
