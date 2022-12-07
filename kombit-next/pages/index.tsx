import Head from "next/head";
import { client } from "../components/contenful/main";
import FrontBanner from "../components/general/FrontBanner";
import WPLandingFeed from "../components/WordPress/WPLandingFeed";
import { BannerImage } from "../interfaces/banner";
import styles from "../styles/Projekt.module.css"
import { useEffect, useState } from "react";
import { GraphCatcher } from "../data/GraphQL";
import { WPAllPagesLimitSort } from "../interfaces/WPIndexes";
import WPProjectBlobs from "../components/WordPress/WPProjekterBlobs";


interface IndexPage {
	
	data: {
		page: {
			excerpt: string;
			content: string;
			title: string;
			slug: string;
			pageId: number;
			featuredImage: any;
			banners: any;
		};
	};
}




export async function getStaticProps() {
	const res = await fetch("http://signepetersen.dk/graphql", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
				{
					page(idType: URI, id: "/") {
						excerpt
						content(format: RENDERED)
						title
						slug
						pageId
						featuredImage {
							node {
								altText
								caption
								link
							}
						}
					}
				}`,
		}),
	});

	const json: IndexPage = await res.json();

	//console.log("0:", json.data.page.pageId);
	//Extra for banner pictures
	const res_page = await (
		await fetch(
			`http://signepetersen.dk/wp-json/wp/v2/pages/${json.data.page.pageId}`
		)
	).json();
	//console.log("1:", res_page);

	json.data.page.banners = (
		await (await fetch(res_page._links["wp:attachment"][0].href)).json()
	).filter((item: any) => {
		return (
			item.id == res_page.acf?.banner_1 || item.id == res_page.acf?.banner_2
		);
	});

	return {
		props: {
			json: json,
		},
	};
}

interface prop {
	json: IndexPage;
}

export default function Home({ json }: prop) {
	const [slide, setSlide] = useState("projekt");

const [projects, setProjects] = useState<
WPAllPagesLimitSort["data"]["pages"]["nodes"]
>([]);



useEffect(() => {
	//Kalender
	GraphCatcher.getAllPagesLimitSort("projekt", 3).then(async (response) => {
		setProjects(response.data.pages.nodes);
	});

}, []);
	//Alle props kommer ovenfra
	//console.log(json.data.page.banners);

	const banners: BannerImage[] = json.data.page.banners.map((banner: any) => {
		return {
			title: banner.title.rendered,
			type: "Image",
			media: banner.source_url,
		};
	});
	//console.log(banners);

	return (
		<>
		
			<Head>
				<title>KOMBIT APP</title>
				<meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" />
			</Head>
			<FrontBanner banners={banners} />
			<div className={styles.container}>
        <h2 id="slide">FORRETNINGSFÆLLSSKABER I KOMBIT</h2>
		</div>

		<div className={styles.CardOverviewContaier}>

		{slide == "projekt" &&
						projects &&
						projects.length != 0 &&
						projects.map((item, i: number) => {
							return (
							

								<WPProjectBlobs item={item}/>
							);
						})}
														</div>

			{/* 
			<FrontBanner banners={banners} />
			<section className="container">
				<h2>Projekter:</h2>
				<ProjectBlobs projects={projects} />
				<h2>Nyheder:</h2>
				<NewsCards news={news} />
			</section>
      */}
	     <div className={styles.container}>
		 <WPLandingFeed/>
      </div>
		</>
	);
}


// return (
//     <>
//       <Head>
//         {/* <title>KOMBIT APP</title>

//         <meta name="description" content="KOMBIT HEADLESS NEXTJS APPLICATION" /> */}
//       </Head>
//       <FrontBanner banners={banners} />
//       <div className={styles.container}>
//         <h2 id="slide">FORRETNINGSFÆLLSSKABER I KOMBIT</h2>
//       </div>
//       <div className={styles.CardOverviewContaier}>
//         <CFProjectBlobs projects={projects} />
//       </div>
//       <div className={styles.container}>
//         <CFFeed />
//       </div>
//     </>
//   );
// }
