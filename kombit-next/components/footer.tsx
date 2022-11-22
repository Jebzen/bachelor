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
		<footer>
			<div className="p-2 d-flex flex-column">
				<h3>KOMBIT A/S</h3>
				<div className="footerbox">
					{infoPages &&
						infoPages.length > 0 &&
						infoPages.map((page: any, i: number) => {
							return (
								<a
									key={i}
									href={"/indhold/" + page.fields.slug}
								>
									{page.fields.title}
								</a>
							);
						})}
				</div>
			</div>
			<div className="p-2 footerbox-2">
				<div>
					<p>KOMBIT A/S, Halfdansgade 8, 2300 København S</p>
					<p>CVR-nr.: 19435075 | EAN-nr. 5790001969370</p>
					<p>3334 9400 | kombit@kombit.dk</p>
				</div>
				<div className="d-flex justify-content-end">
					<p>Find os på:</p>
					<p>
						<a
							href="http://www.linkedin.com/company/kombit-a-s"
							className="fs-4 ms-2"
						>
							<i className="bi bi-linkedin"></i>
						</a>
						<a
							href="https://twitter.com/kombitdk"
							className="fs-4 mx-2"
						>
							<i className="bi bi-twitter"></i>
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
