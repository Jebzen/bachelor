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
		<footer className="p-5 mt-auto">
			<div className="container">
				<div className="row">
					<h3 className="fw-bold col-12">KOMBIT A/S</h3>
					<div className="col-3 d-flex flex-column">
						<h4 className="fw-bold">Adresse</h4>
						<p>Halfdansgade 8</p>
						<p>2300 København S</p>
						<div className="mt-auto">
							<a
								href="http://www.linkedin.com/company/kombit-a-s"
								className="fs-4"
							>
								<i className="bi bi-linkedin"></i>
							</a>
							<a href="https://twitter.com/kombitdk" className="fs-4 mx-2">
								<i className="bi bi-twitter"></i>
							</a>
						</div>
					</div>
					<div className="col-3">
						<h4 className="fw-bold">Kontakt</h4>
						<p>CVR: 19435075</p>
						<p>EAN: 5790001969370</p>
						<p>Tlf: 3334 9400</p>
						<p>
							<a href="mailto:kombit@kombit.dk?subject=Mail fra website">
								kombit@kombit.dk
							</a>
						</p>
					</div>
					<div className="col-6">
						<h4 className="fw-bold">Inhold</h4>
						<div className="indhold-sider">
							{infoPages.data.pages.nodes &&
								infoPages.data.pages.nodes.length > 0 &&
								infoPages.data.pages.nodes.map((page: any, i: number) => {
									return (
										<a key={i} href={"/indhold/" + page.slug}>
											{page.title}
										</a>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
