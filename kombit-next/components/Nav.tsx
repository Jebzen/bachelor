import { Container, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavDropdownExample({ PageTypes }: any) {
	console.log(PageTypes);
	return (
		<>
			<Navbar
				collapseOnSelect
				expand="lg"
				className="justify-content-end"
			>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					id="basic-navbar-nav"
					className="justify-content-end"
				>
					<Nav>
						{PageTypes &&
							PageTypes.length > 0 &&
							PageTypes.map((type: any) => {
								return (
									<Nav.Item className="text-end">
										<Nav.Link href={"/" + type.sys.id}>
											{type.name}
										</Nav.Link>
									</Nav.Item>
								);
							})}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}
