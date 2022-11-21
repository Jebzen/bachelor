import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { createClient } from "contentful";
import { IndexLayout } from "../../layout";
import styles from "../../styles/Projekt.module.css";
import Image from "next/image";
import ProjectCards from "../../components/ProjectCard";

const client = createClient({
	space: "7mkgxnbudn0o",
	accessToken: "EcZKFhLUFp3op1UWgVR3qouQ8iwYwIDf0ZEdjygBZKA",
});

export const getStaticPaths = async () => {
	const res = await client.getEntries({
		content_type: "projekt",
	});

	const paths = res.items.map((item: any) => {
		return {
			params: { slug: item.fields.slug },
		};
	});

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps = async ({ params }: any) => {
	const { items } = await client.getEntries({
		content_type: "projekt",
		"fields.slug": params.slug,
	});

	return {
		props: { projekt: items[0] },
		revalidate: 1,
	};
};

export default function ProjektPage({ projekt }: any) {
	const { title, beskrivelse, featuredImage, links, cards } = projekt.fields;
	console.log(projekt);
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<IndexLayout>
				<div className={styles.pageContainer}>
					<div className={styles.hero}>
						<div className={styles.insideHero}>
							<h1 className={styles.single}>{title}</h1>
							<h2>OM PROJEKTET</h2>
						</div>
					</div>
					<div className={styles.columns}>
						<div>{documentToReactComponents(beskrivelse)}</div>
						<div>
							<Image
								alt={title}
								src={"https:" + featuredImage.fields.file.url}
								className={styles.columnsImg}
								width={500}
								height={500}
							/>
						</div>
					</div>
					<div className={styles.cardContainer}>
						{cards.map((item: any) => {
							return (
								<div className={styles.card} key={item.sys.id}>
									<div className={styles.cardHeader}>
										<h4>{item.fields.titel}</h4>
									</div>

									<p className={styles.cardDescription}>
										{documentToReactComponents(
											item.fields.beskrivelse
										)}
									</p>
								</div>
							);
							// console.log(item.fields.titel);
							// this creates a wierd error

							// console.log(item.fields.beskrivelse);
							// return ;
							// return <ProjectCards key={item.sys.id} item={item} />;
						})}
						<span
							aria-hidden="true"
							className="carousel-control-next-icon arrow"
						></span>
					</div>
					<div>
						<>{documentToReactComponents(links)}</>
						<>{}</>
					</div>
				</div>
			</IndexLayout>
		</>
	);
}
