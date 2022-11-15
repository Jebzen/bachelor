import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";

export function IndexLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
