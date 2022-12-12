import { WPSinglePage } from "../../interfaces/WPIndexes";
import PageHero from "../general/PageHero";
import styles from "../../styles/Calendar.module.css";

interface prop {
	content: WPSinglePage;
}

export default function WPKalenderComponent({ content }: prop) {
	//console.log(content);
	if (!content.data?.page) return <></>;
	const { page } = content.data;

	return (
		<>
			<PageHero
				heading={page.title}
				abstrakt={<span dangerouslySetInnerHTML={{ __html: page.excerpt }} />}
			/>

			<section className="container section-container">
				<div className="d-flex flex-column">
					<h2 className={styles.calendarNumber}>{page.datoField.dato}</h2>
					<div className={"kalender-main"}>
						<span dangerouslySetInnerHTML={{ __html: page.content }} />
					</div>
				</div>
			</section>
		</>
	);
}
