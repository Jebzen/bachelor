import { useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import pageLink from "../../interfaces/pageLink";

interface prop {
	pageLinks: pageLink[];
}

export default function NavLinks({ pageLinks }: prop) {
	return (
		<>
			<Navbar collapseOnSelect expand="lg" className="justify-content-end">
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav>
						{pageLinks &&
							pageLinks.length > 0 &&
							pageLinks.sort().map((type, i: number) => {
								return (
									<Nav.Item className="text-end" key={i}>
										<Nav.Link href={"/" + type.slug}>{type.title}</Nav.Link>
									</Nav.Item>
								);
							})}
						<Nav.Item className="text-end">
							<Nav.Link href="/kontakt">Kontakt</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}
