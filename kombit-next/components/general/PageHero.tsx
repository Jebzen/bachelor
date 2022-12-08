import React from "react";
import styles from "../../styles/Projekt.module.css";

//Mulig fuck up

export default function PageHero(props: any) {
	return (
		<div className={styles.hero}>
			<h1 className={styles.heroHeading}>{props.heading}</h1>
			{props.abstrakt}
		</div>
	);
}
