import { WPSinglePage } from "../../interfaces/WPIndexes";

interface prop {
	content: WPSinglePage;
}

export default function WPKalenderComponent({ content }: prop) {
	//console.log(content);
	const { page } = content.data;

	const date =
		page.datetime !== undefined
			? `${page.datetime.substring(0, 4)}-${page.datetime.substring(
					4,
					6
			  )}-${page.datetime.substring(6, 8)}`
			: "";

	return (
		<section className="container">
			<div className="d-flex flex-column">
				<h1>
					{page.title} - {date}
				</h1>
				<small>
					<span dangerouslySetInnerHTML={{ __html: page.excerpt }} />
				</small>
				<div className="kalender-main new-table">
					<span dangerouslySetInnerHTML={{ __html: page.content }} />
				</div>
			</div>
		</section>
	);
}
