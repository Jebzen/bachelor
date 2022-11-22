import Head from "next/head";
import React from "react";
import { client } from "../components/contenful/main";
import Footer from "../components/footer";
import Header from "../components/header";

export function IndexLayout({ children, infoPages, PageTypes }: any) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header PageTypes={PageTypes} />
			<main>{children}</main>
			<Footer infoPages={infoPages} />
		</>
	);
}
