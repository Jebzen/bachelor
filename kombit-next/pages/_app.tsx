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
import pageLink from "../interfaces/pageLink";

interface prop extends AppProps {
	Component: any;
	pageProps: any;
	footerLinks: pageLink[];
	pageLinks: pageLink[];
}

export default function App({
	Component,
	pageProps,
	footerLinks,
	pageLinks,
}: prop | any) {
	return (
		<IndexLayout footerLinks={footerLinks} pageLinks={pageLinks}>
			<Component {...pageProps} />
		</IndexLayout>
	);
}

App.getInitialProps = async (context: any) => {
	let pageLinks: pageLink[] | null = null;
	let footerLinks: pageLink[] | null = null;

	if (context.router.asPath.split("/")[1] == "wordpress") {
		//Wordpress Site!
		//Footer info pages
		footerLinks = (
			await GraphCatcher.getAllPages("infoside")
		).data.pages.nodes.map((node: any) => {
			return {
				slug: node.slug,
				title: node.title,
			} as pageLink;
		});
		pageLinks = (await GraphCatcher.getAllCategories()).data.categories.nodes;
	} else if (context.router.asPath.split("/")[1] == "contenful") {
		//Contenful Site!
	} else {
		//No subsite found
	}

	return {
		footerLinks,
		pageLinks,
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
