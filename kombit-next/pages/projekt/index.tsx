import PageHero from "../../components/general/PageHero";
import { useState } from "react";
import styles from "../../styles/Projekt.module.css";
import { GraphCatcher } from "../../data/GraphQL";
import { WPAllPages } from "../../interfaces/WPIndexes";
import { client } from "../../components/contenful/main";
import { CFEntryProjekt } from "../../interfaces/CFentry";
import CFCardOverview from "../../components/contenful/CFCardOverview";
import WPCardOverview from "../../components/wordpress/WPCardOverview";

/* CONTENTFUL VERSION START */
/*
export async function getServerSideProps() {
	const response = await client.getEntries({
		content_type: "projekt",
	});

	return {
		props: {
			projekt: response.items,
		},
	};
}

interface prop {
	projekt: CFEntryProjekt[];
}

export default function Projekter({ projekt }: prop) {
	let tags: any[] = [];
	projekt
		.map((projekt, i: number) => {
			return projekt.metadata.tags.map((tag: any) => {
				return {
					name: tag.sys.id.toUpperCase(),
					slug: tag.sys.id,
				};
			});
		})
		.flat(1)
		.filter((item) => {
			const isDuplicate = tags.find((tag) => {
				return tag.slug == item.slug;
			});
			if (!isDuplicate) {
				tags.push(item);
				tags = tags.sort((a: any, b: any) => {
					if (a.name > b.name) {
						return 1;
					}
					if (a.name < b.name) {
						return -1;
					}
					return 0;
				});
				return true;
			}
			return false;
		})
		.sort();

	const [tab, setTab] = useState(tags[0].slug);

	return (
		<div>
			<PageHero heading={"Projekt overblik"} />
			<div className="tabsContainer">
				{tags.map((tag, i) => {
					return (
						<div
							className={
								tab == tag.slug
									? "tabLink activebox text-uppercase tabs"
									: "tabLink text-uppercase tabs"
							}
							aria-current="page"
							onClick={() => setTab(tag.slug)}
							key={i}
						>
							{tag.name}
						</div>
					);
				})}
				<div
					className={
						tab == "other"
							? "tabLink activebox text-uppercase tabs"
							: "tabLink text-uppercase tabs"
					}
					aria-current="page"
					onClick={() => setTab("other")}
				>
					Ukategoriseret
				</div>
			</div>
			<div className={styles.CardOverviewContaier}>
				{projekt.map((node, i) => {
					let tag: any;
					if (
						node.metadata.tags.find((node: any) => {
							if (node.sys.id == tab) {
								tag = node;
								return node.sys.id == tab;
							}
						})
					) {
						return (
							<div className={styles.cardBody} key={i}>
								<CFCardOverview
									projekt={node}
									tag={tag}
									showTag={true}
									showTagHover={false}
								/>
							</div>
						);
					} else if (node.metadata.tags.length == 0 && tab == "other") {
						return (
							<div className={styles.cardBody} key={i}>
								<CFCardOverview
									projekt={node}
									tag={tag}
									showTag={false}
									showTagHover={false}
								/>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
export async function getServerSideProps() {
	const res = await GraphCatcher.getAllPages("Projekt");

	return {
		props: {
			content: res,
		},
	};
}

interface prop {
	content: WPAllPages;
}

export default function Projekter({ content }: prop) {
	//console.log(projekt);
	//console.log(tag);

	const arr: any[] = [];
	const tags = content?.data?.pages?.nodes
		.filter((page) => {
			return page.tags.nodes.length > 0;
		})
		.map((page) => {
			return {
				name: page.tags.nodes[0].name,
				slug: page.tags.nodes[0].slug,
			};
		})
		.filter((page) => {
			if (
				!arr.find((arrPage) => {
					if (arrPage && arrPage.slug == page.slug) {
						return page.slug;
					}
				})
			) {
				arr.push(page);
				return page;
			}
		});
	//console.log(tags);

	const [tab, setTab] = useState(tags ? tags[0].slug : "");

	return (
		<div>
			<PageHero heading={"Projekt overblik"} />
			<div className="tabsContainer">
				{tags &&
					tags.map((tag, i) => {
						return (
							<div
								className={
									tab == tag.slug
										? "tabLink activebox text-uppercase tabs"
										: "tabLink text-uppercase"
								}
								aria-current="page"
								onClick={() => setTab(tag.slug)}
								key={i}
							>
								{tag.name}
							</div>
						);
					})}
				<div
					className={
						tab == "other"
							? "tabLink activebox text-uppercase tabs"
							: "tabLink text-uppercase"
					}
					aria-current="page"
					onClick={() => setTab("other")}
				>
					Ukategoriseret
				</div>
			</div>
			<div className={styles.CardOverviewContaier}>
				{content?.data?.pages &&
					content.data.pages.nodes.map((node, i: number) => {
						if (node.tags.nodes[0]?.slug == tab) {
							return (
								<div className={styles.cardBody} key={i}>
									<WPCardOverview projekt={node} />
								</div>
							);
						} else if (node.tags.nodes.length == 0 && tab == "other") {
							return (
								<div className={styles.cardBody} key={i}>
									<WPCardOverview projekt={node} />
								</div>
							);
						}
					})}
			</div>
		</div>
	);
}
/* WORDPRESS VERSION END */
