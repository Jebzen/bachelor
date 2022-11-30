import React from "react";
import styles from "../../styles/Projekt.module.css";

export default function PageHero(props: any) {
	return (
		<div className={styles.hero}>
			<h1 className={styles.heroHeading}>{props.heading}</h1>
		</div>
	);
}
