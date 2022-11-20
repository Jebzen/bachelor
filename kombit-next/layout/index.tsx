import Head from "next/head";
import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";

export function IndexLayout({ children }: any) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
