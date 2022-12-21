import Head from "next/head";
import { useRouter } from "next/router";
import { IndexLayout } from "../layout";

export default function NotFoundPage() {
	const router = useRouter();
	//console.log(router);
	//console.log(router.asPath.split("/"));
	return (
		<>
			<Head>
				<title>Side ikke fundet</title>
			</Head>
			<section className="notFoundPage mt-5">
				<h1>404</h1>
				<h2>Side ikke fundet</h2>
				{router.asPath.split("/").length > 1 && (
					<p>
						Vil du hellere søge efter{" "}
						<a
							href={
								"/soeg?term=" +
								router.asPath.split("/")[router.asPath.split("/").length - 1]
							}
						>
							{router.asPath.split("/")[router.asPath.split("/").length - 1]}
						</a>{" "}
						?
					</p>
				)}
			</section>
		</>
	);
}
