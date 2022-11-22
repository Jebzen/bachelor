import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { client } from "./contenful/main";
import NavDropdownExample from "./Nav";

export default function Header({ PageTypes }: any) {
	const router = useRouter();
	const { term } = router.query;
	const [searchTerm, setSearchTerm] = useState(term);

	//Taget fra
	//https://dev.to/dan_starner/building-dynamic-breadcrumbs-in-nextjs-17oa
	const breadCrumbs = React.useMemo(
		function generateBreadcrumbs() {
			const asPathWithoutQuery = router.asPath.split("?")[0];
			const asPathNestedRoutes = asPathWithoutQuery
				.split("/")
				.filter((v) => v.length > 0);

			const crumblist = asPathNestedRoutes.map((subpath, idx) => {
				const href =
					"/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
				return { href, text: subpath };
			});

			return [{ href: "/", text: "Home" }, ...crumblist];
		},
		[router.asPath]
	);

	return (
		<>
			<header className="d-flex flex-column p-2 pb-0">
				<div id="topBar" className="d-flex justify-content-between">
					<div className="logo-parent">
						<a href="/">
							<img
								className="logo"
								src="/logo-2.png"
								alt="Kombit Logo"
							/>
						</a>
					</div>
					<form className="input-group mb-3" action="/soeg">
						<input
							type="text"
							className="form-control"
							placeholder="Søg her..."
							aria-label="Søgningsfelt"
							name="term"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button
							className="input-group-text"
							type="submit"
							id="button-addon2"
						>
							Søg <i className="ms-1 bi bi-search"></i>
						</button>
					</form>
				</div>

				<NavDropdownExample PageTypes={PageTypes} />
			</header>
			{breadCrumbs.length != 0 && (
				<div className="p-2 breadCrumbs" id="breadCrumbs">
					{breadCrumbs.map((crumb: any, i: number) => {
						return (
							<a key={i} href={crumb.href}>
								{crumb.text} /{" "}
							</a>
						);
					})}
				</div>
			)}
		</>
	);
}
