import { Container, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function WPNavLinks({ PageTypes }: any) {
	const { nodes } = PageTypes;

	return (
		<>
			<Navbar collapseOnSelect expand="lg" className="justify-content-end py-0">
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav>
						{nodes &&
							nodes.length > 0 &&
							nodes
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
