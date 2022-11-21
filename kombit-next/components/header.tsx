import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
	const router = useRouter();
	const { term } = router.query;
	const [searchTerm, setSearchTerm] = useState(term);

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
					<form className="searchBar" action="/soeg">
						<input
							className="form-control"
							type="text"
							placeholder="Søg her..."
							aria-label="Søgningsfelt"
							name="term"
							value={searchTerm}
							readOnly={false}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</form>
				</div>
				<div id="bottomBar">
					<ul className="nav justify-content-end">
						<li className="nav-item">
							<a className="nav-link" href="#">
								Karriere
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Om os
							</a>
						</li>
					</ul>
				</div>
			</header>
			<div className="p-2 breadCrumbs" id="breadCrumbs">
				Something/something
			</div>
		</>
	);
}
