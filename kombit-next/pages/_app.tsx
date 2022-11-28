import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "../styles/main.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.scss";
import NProgress from "nprogress";
import { IndexLayout } from "../layout";
import { client } from "../components/contenful/main";
import { useEffect } from "react";
import { GraphCatcher } from "../data/GraphQL";
import { useRouter } from "next/router";
import InfoPageLink from "../interfaces/infoPageLink";

interface prop extends AppProps {
	Component: any;
	pageProps: any;
	PageTypes: any;
	footerLinks: InfoPageLink[];
}

export default function App({
	Component,
	pageProps,
	PageTypes,
	footerLinks,
}: prop | any) {
	return (
		<IndexLayout
			PageTypes={PageTypes}
			footerLinks={footerLinks as InfoPageLink[]}
		>
			<Component {...pageProps} />
		</IndexLayout>
	);
}

App.getInitialProps = async (context: any) => {
	let infoPages = null;
	let PageTypes = null;
	let footerLinks: InfoPageLink[] | null = null;

	if (context.router.asPath.split("/")[1] == "wordpress") {
		//Wordpress Site!
		footerLinks = (
			await GraphCatcher.getAllPages("infoside")
		).data.pages.nodes.map((node: any) => {
			return {
				slug: node.slug,
				title: node.title,
			} as InfoPageLink;
		});
		PageTypes = (await GraphCatcher.getAllCategories()).data.categories;
	} else if (context.router.asPath.split("/")[1] == "contenful") {
		//Contenful Site!
	}

	//Footer info pages
	infoPages = await GraphCatcher.getAllPages("infoside");

	//Header page types
	PageTypes = (await GraphCatcher.getAllCategories()).data.categories;

	return {
		PageTypes,
		footerLinks,
	};
};

/* 
<i class="bi bi-arrow-{direction}-short"></i>
<i class="bi bi-chevron-{direction}"></i>

<i class="bi bi-twitter"></i>
<i class="bi bi-facebook"></i>
<i class="bi bi-search"></i>
<i class="bi bi-file-earmark"></i>
<i class="bi bi-key"></i>
<i class="bi bi-lock"></i>
<i class="bi bi-check"></i>
<i class="bi bi-x"></i>
<i class="bi bi-cloud-upload"></i>
<i class="bi bi-cloud-download"></i>
<i class="bi bi-box-arrow-down"></i>
<i class="bi bi-trash"></i>
<i class="bi bi-mic"></i>
???
<i class="bi bi-voicemail"></i>
<i class="bi bi-patch-question"></i>
<i class="bi bi-clock"></i>
*/
