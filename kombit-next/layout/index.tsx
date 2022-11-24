import Head from "next/head";
import React from "react";
import { client } from "../components/contenful/main";
import Footer from "../components/footer";
import Header from "../components/header";
import { useEffect, useState } from "react";

export function IndexLayout({ children, infoPages, PageTypes }: any) {
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
			<div data-theme={theme ? "dark" : ""}>
				<Header PageTypes={PageTypes} />
				<main>{children}</main>
				<Footer infoPages={infoPages} />
			</div>
		</>
	);
}
