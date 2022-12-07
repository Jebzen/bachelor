import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "../styles/main.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.scss";
import { IndexLayout } from "../layout";
import { GraphCatcher } from "../data/GraphQL";
import pageLink from "../interfaces/pageLink";
import { client } from "../components/contenful/main";
import { CFEntryIndhold } from "../interfaces/CFentry";

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
	//console.log(footerLinks, pageLinks);
	return (
		<>
			<IndexLayout footerLinks={footerLinks} pageLinks={pageLinks}>
				<Component {...pageProps} />
			</IndexLayout>
		</>
	);
}

/* CONTENTFUL VERSION START */
/*
App.getInitialProps = async (context: any) => {
	let pageLinks: pageLink[] | null | { name: string; slug: string }[] = null;
	let footerLinks: pageLink[] | null = null;

	//Footer info pages
	const response: CFEntryIndhold[] = (
		await client.getEntries({
			content_type: "infoside",
		})
	).items;
	footerLinks = response.map((res) => {
		return {
			slug: res.fields.slug,
			title: res.fields.title,
		};
	});

	//Header page types
	const responsePageTypes = await client.getContentTypes();
	pageLinks = responsePageTypes.items
		.filter((item: any) => {
			return item.fields.find((field: any) => {
				return field.id == "slug";
			});
		})
		.map((type: any) => {
			return {
				slug: type.sys.id,
				title: type.sys.id.charAt(0).toUpperCase() + type.sys.id.slice(1),
			};
		});

	return {
		footerLinks,
		pageLinks,
	};
};
/* CONTENTFUL VERSION END */

/* WORDPRESS VERSION START */
App.getInitialProps = async (context: any) => {
	let pageLinks:
		| pageLink[]
		| null
		| { name: string; slug: string }[]
		| undefined = null;
	let footerLinks: pageLink[] | null | undefined = null;

	//Wordpress Site!
	//Footer info pages
	footerLinks = (
		await GraphCatcher.getAllPages("infoside")
	)?.data?.pages?.nodes.map((node: any) => {
		return {
			slug: node.slug,
			title: node.title,
		} as pageLink;
	});
	pageLinks = (
		await GraphCatcher.getAllCategories()
	)?.data?.categories?.nodes.map((a) => {
		return {
			title: a.name,
			slug: a.slug,
		};
	});

	return {
		footerLinks,
		pageLinks,
	};
};
/* WORDPRESS VERSION END */

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
