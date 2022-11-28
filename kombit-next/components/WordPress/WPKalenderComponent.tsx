import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Accordion } from "react-bootstrap";
import SoMeFeed from "../Feed2";
import ShareButtons from "../ShareButtons";

export default function WPKalenderComponent({ content }: any) {
	console.log(content);
	const date = `${content.datetime.substring(
		0,
		4
	)}-${content.datetime.substring(4, 6)}-${content.datetime.substring(6, 8)}`;

	return (
		<section className="container">
			<div className="d-flex flex-column">
				<h1>
					{content.title} - {date}
				</h1>
				<small>
					<span dangerouslySetInnerHTML={{ __html: content.excerpt }} />
				</small>
				<div className="kalender-main new-table">
					<span dangerouslySetInnerHTML={{ __html: content.content }} />
				</div>
			</div>
		</section>
	);
}
