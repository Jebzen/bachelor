import { Container, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import pageLink from "../../interfaces/pageLink";

interface prop {
	pageLinks: pageLink[];
}

export default function WPNavLinks({ pageLinks }: prop) {
	return (
		<>
			<Navbar collapseOnSelect expand="lg" className="justify-content-end py-0">
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav>
						{pageLinks &&
							pageLinks.length > 0 &&
							pageLinks
								.sort((a: any, b: any) => {
									return a.name - b.name;
								})
								.map((type: any, i: number) => {
									return (
										<Nav.Item className="text-end" key={i}>
											<Nav.Link href={"/" + type.slug}>{type.name}</Nav.Link>
										</Nav.Item>
									);
								})}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}
