import { useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import pageLink from "../../interfaces/pageLink";
import { useRouter } from "next/router";

interface prop {
	pageLinks: pageLink[];
	searchTerm: any;
	setSearchTerm: Function;
	climate: boolean;
	handleChange: any;
}

export default function NavLinks({
	pageLinks,
	searchTerm,
	setSearchTerm,
	climate,
	handleChange,
}: prop) {
	const router = useRouter();
	console.log(router.pathname);
	return (
		<>
			<Navbar collapseOnSelect expand="lg" className="justify-content-end">
				<Navbar.Brand href="/" className="d-block d-lg-none ms-2 me-auto">
					<img className="logo p-1" src="/logo-2.png" alt="Kombit Logo" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" className="me-2" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav>
						<div className="text-end nav-item d-lg-none">
							<a href="/" data-rr-ui-event-key="/" className="nav-link">
								Forside
							</a>
						</div>

						{pageLinks &&
							pageLinks.length > 0 &&
							pageLinks.sort().map((type, i: number) => {
								return (
									<Nav.Item className="text-end" key={i}>
										<Nav.Link
											href={"/" + type.slug}
											className={
												router.pathname == `/${type.slug}`
													? "activeNavLink"
													: ""
											}
										>
											{type.title}
										</Nav.Link>
									</Nav.Item>
								);
							})}

						<div className="text-end nav-item">
							<a
								href="/kontakt"
								data-rr-ui-event-key="/kontakt"
								className="nav-link"
							>
								Kontakt
							</a>
						</div>

						<div id="nav-climate" className="d-lg-none">
							<div className="form-check form-switch">
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
						</div>

						<form
							className="input-group d-lg-none"
							action="/soeg"
							id="nav-search"
						>
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
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}
