import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { client } from "./contenful/main";

/*
export default function Footer() {
	return (
		<footer className="footer">
			<a
				href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
				target="_blank"
				rel="noopener noreferrer"
			>
				Powered by{" "}
				<span className="logo">
					<Image
						src="/vercel.svg"
						alt="Vercel Logo"
						width={72}
						height={16}
					/>
				</span>
			</a>
		</footer>
	);
}
*/

export default function Footer({ infoPages }: any) {
	return (
		<footer className="p-2 d-flex flex-column">
			<h3>KOMBIT A/S</h3>
			<div className="footerbox">
				{infoPages &&
					infoPages.length > 0 &&
					infoPages.map((page: any, i: number) => {
						return (
							<a key={i} href={"/indhold/" + page.fields.slug}>
								{page.fields.title}
							</a>
						);
					})}
			</div>
		</footer>
	);
}
