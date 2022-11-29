import Head from "next/head";
import React from "react";
import { client } from "../components/contenful/main";
import Footer from "../components/footer";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import pageLink from "../interfaces/pageLink";

interface prop {
	children: any;
	footerLinks: pageLink[];
	pageLinks: pageLink[];
}

export function IndexLayout({ children, footerLinks, pageLinks }: prop) {
	const [theme, setTheme] = useState(false);

	useEffect(() => {
		if (typeof window !== undefined) {
			setTheme(localStorage.getItem("Climate-friendly") == "true");
		}
	}, []);

	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<title>Kombit app</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<div data-theme={theme ? "dark" : "light"}>
				<Header pageLinks={pageLinks} />
				<main>{children}</main>
				<Footer footerLinks={footerLinks as pageLink[]} />
			</div>
		</>
	);
}
