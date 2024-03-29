import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import pageLink from "../../interfaces/pageLink";
import NavLinks from "../general/NavLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface prop {
	pageLinks: pageLink[];
}

export default function Header({ pageLinks, whiteColor, setWhiteColor }: any) {
	const router = useRouter();
	const { term } = router.query;
	const [searchTerm, setSearchTerm] = useState(term);
	const [climate, setClimate] = useState(false);

	//Taget fra
	//https://dev.to/dan_starner/building-dynamic-breadcrumbs-in-nextjs-17oa
	const breadCrumbs = React.useMemo(
		function generateBreadcrumbs() {
			const asPathWithoutQuery = router.asPath.split("?")[0];
			const asPathNestedRoutes = asPathWithoutQuery
				.split("/")
				.filter((v) => v.length > 0);

			const crumblist = asPathNestedRoutes.map((subpath, idx) => {
				const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
				return { href, text: subpath };
			});

			return [{ href: "/", text: "Home" }, ...crumblist];
		},
		[router.asPath]
	);

	const handleChange = (e: any) => {
		if (typeof window !== undefined) {
			localStorage.setItem("Climate-friendly", e.target.checked.toString());

			router.reload();
		}
	};

	useEffect(() => {
		if (typeof window !== undefined) {
			setClimate(localStorage.getItem("Climate-friendly") == "true");
		}
	}, []);

	return (
		<>
			<header className="pt-0 pt-lg-2 container d-flex flex-column">
				<div className="justify-content-between mb-3 d-none d-lg-flex">
					<div className="d-flex align-items-center">
						<a href="/">
							<img className="logo" src="/logo-2.png" alt="Kombit Logo" />
						</a>
					</div>
					<div className="d-flex align-items-center">
						<div className="form-check form-switch me-3">
							<input
								className="form-check-input"
								type="checkbox"
								role="switch"
								id="flexSwitchCheckDefault"
								onChange={handleChange}
								checked={climate}
							/>
							<label
								className="form-check-label"
								htmlFor="flexSwitchCheckDefault"
							>
								Climate Friendly
							</label>
						</div>
						<form className="input-group" action="/soeg">
							<input
								type="text"
								className="form-control"
								placeholder="Søg her..."
								aria-label="Søgningsfelt"
								name="term"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								id="SearchInput"
							/>
							<button
								className="input-group-text"
								type="submit"
								id="SearchButton"
							>
								<i className="bi bi-search"></i>
							</button>
						</form>
					</div>
				</div>
				<NavLinks
					pageLinks={pageLinks}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					climate={climate}
					handleChange={handleChange}
				/>
			</header>

			{breadCrumbs.length > 1 && (
				<div
					className="d-none d-lg-flex pb-2 breadCrumbs container"
					id="breadCrumbs"
				>
					{breadCrumbs.map((crumb: any, i: number) => {
						return (
							<a key={i} href={crumb.href}>
								{crumb.text}{" "}
								{breadCrumbs[i + 1] && (
									<small className="breadcrumb-arrow">
										{<FontAwesomeIcon icon={faChevronRight} />}{" "}
									</small>
								)}
							</a>
						);
					})}
				</div>
			)}
		</>
	);
}
