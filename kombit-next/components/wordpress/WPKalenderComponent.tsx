import { WPSinglePage } from "../../interfaces/WPIndexes";

interface prop {
	content: WPSinglePage;
}

export default function WPKalenderComponent({ content }: prop) {
	//console.log(content);
	if (!content.data?.page) return <></>;
	const { page } = content.data;

	return (
		<section className="container">
			<div className="d-flex flex-column">
				<h1>
					{page.title} - {page.datoField.dato}
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
