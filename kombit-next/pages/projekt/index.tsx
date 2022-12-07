import PageHero from "../../components/general/PageHero";
import { useState } from "react";
import styles from "../../styles/Projekt.module.css";
import { GraphCatcher } from "../../data/GraphQL";
import { WPAllPages } from "../../interfaces/WPIndexes";
import WPCardOverview from "../../components/wordpress/WPCardOverview";

export async function getStaticProps() {
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
	//console.log(content);
	const tags = content.data.pages.nodes
		.filter((page) => {
			return page.tags.nodes.length > 0;
		})
		.map((page) => {
			return {
				name: page.tags.nodes[0].name,
				slug: page.tags.nodes[0].slug,
			};
		});
	//console.log(tags);

	const [tab, setTab] = useState(tags[0].slug);

	return (
		<div>
			<PageHero heading={"Projekt overblik"} />
			<div className="tabsContainer">
				{tags.map((tag, i: number) => {
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
				{content.data.pages.nodes.map((node, i: number) => {
					if (
						node.tags.nodes.find((node) => {
							return node.slug == tab;
						})
					) {
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
