import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { client } from "../../components/contenful/main";
import PageHero from "../../components/general/PageHero";
import { CFEntryKalender } from "../../interfaces/CFentry";
import styles from "../../styles/Calendar.module.css";

/* CONTENTFUL VERSION START */
export async function getServerSideProps(context: any) {
	const response = await client.getEntries({
		content_type: "kalender",
	});

	return {
		props: {
			content: response.items,
		},
	};
}

interface prop {
	content: CFEntryKalender[];
}

export default function Kalender({ content }: prop) {
	console.log(content);

	return (
		<>
			<Head>
				<title>Kalender</title>
			</Head>
			<PageHero heading={"Kalender"}/>
			<section className="container kalenderContainer">
				<div className="">
					{content &&
						content.length > 0 &&
						content.map((item: any, i: number) => {
							return (
								<a
									key={i}
									href={"/kalender/" + item.fields.slug}
									className="text-decoration-none text-dark kalender"
								><div className={styles.kalenderCard}>
									<h3>
										{item.fields.dato}
										<i className="bi-arrow-right-short"></i>
									</h3>
									<hr />
									<h2>{item.fields.title}</h2>
									{documentToReactComponents(item.fields.abstrakt)}
									</div></a>
							);
						})}
				</div>
			</section>
		</>
	);
}
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
/*
export async function getServerSideProps(context: any) {
	const response = await GraphCatcher.getAllPages("kalender");

	return {
		props: {
			content: response,
		},
	};
}

interface prop {
	content: WPAllPages;
}

export default function Kalender({ content }: prop) {
	//console.log(content);
	if (!content.data?.pages) return <></>;
	const { nodes } = content.data.pages;

	return (
		<>
			<Head>
				<title>Kalender</title>
			</Head>
			<PageHero heading={"Kalender"} />

			<section className="container kalenderContainer  ">
				<div className="">
					{nodes &&
						nodes.length > 0 &&
						nodes.map((item, i: number) => {
							return (
								<a
									key={i}
									href={"/kalender/" + item.slug}
									className="text-decoration-none text-dark kalender"
								>
									<div className={styles.kalenderCard}>
										<h3>
											{item.datoField.dato}
											<i className="bi-arrow-right-short"></i>
										</h3>
										<hr />
										<h2>{item.title}</h2>
										<span dangerouslySetInnerHTML={{ __html: item.excerpt }} />
									</div>
								</a>
							);
						})}
				</div>
			</section>
		</>
	);
}
/* WORDPRESS VERSION END */
