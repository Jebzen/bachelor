import pageLink from "../../interfaces/pageLink";

interface prop {
	footerLinks: pageLink[];
}

export default function Footer({ footerLinks }: prop) {
	return (
		<footer className="p-5 mt-auto">
			<div className="container">
				<div className="row">
					<h3 className="fw-bold col-12">KOMBIT A/S</h3>
					<div className="col-3 d-flex flex-column">
						<h4 className="fw-bold">Adresse</h4>
						<p>Halfdansgade 8</p>
						<p>2300 København S</p>
						<div className="mt-auto">
							<a
								href="http://www.linkedin.com/company/kombit-a-s"
								className="fs-4"
							>
								<i className="bi bi-linkedin"></i>
							</a>
							<a href="https://twitter.com/kombitdk" className="fs-4 mx-2">
								<i className="bi bi-twitter"></i>
							</a>
						</div>
					</div>
					<div className="col-3">
						<h4 className="fw-bold">Kontakt</h4>
						<p>CVR: 19435075</p>
						<p>EAN: 5790001969370</p>
						<p>Tlf: 3334 9400</p>
						<p>
							<a href="mailto:kombit@kombit.dk?subject=Mail fra website">
								kombit@kombit.dk
							</a>
						</p>
					</div>
					<div className="col-6">
						<h4 className="fw-bold">Inhold</h4>
						<div className="indhold-sider">
							{footerLinks &&
								footerLinks.length > 0 &&
								footerLinks.map((page: pageLink, i: number) => {
									return (
										<a key={i} href={"/indhold/" + page.slug}>
											{page.title}
										</a>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
