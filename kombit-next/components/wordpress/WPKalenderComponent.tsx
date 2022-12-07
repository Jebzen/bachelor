import { WPSinglePage } from "../../interfaces/WPIndexes";
import PageHero from "../general/PageHero";
import styles from "../../styles/Calendar.module.css"


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
		<>
							<PageHero heading={page.title} abstrakt={<span dangerouslySetInnerHTML={{ __html: page.excerpt }} />}/>

		
		<section className="container news">
			<div className="d-flex flex-column">
				<h2 className={styles.calendarNumber} >
					{date}
				</h2>
	
				<div className={"kalender-main"}>
					<span dangerouslySetInnerHTML={{ __html: page.content }} />
				</div>
			</div>
		</section>
		</>

	);
}
