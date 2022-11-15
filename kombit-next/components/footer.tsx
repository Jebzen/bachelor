import Image from "next/image";
import styles from "../styles/Home.module.css";

/*
export default function Footer() {
	return (
		<footer className="footer">
			<a
				href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
				target="_blank"
				rel="noopener noreferrer"
			>
				Powered by{" "}
				<span className="logo">
					<Image
						src="/vercel.svg"
						alt="Vercel Logo"
						width={72}
						height={16}
					/>
				</span>
			</a>
		</footer>
	);
}
*/

export default function Footer() {
	return (
		<footer className="p-2 d-flex flex-column">
			<h3>KOMBIT A/S</h3>
			<div className="row w-100">
				<div className="col-3">
					<div className="d-flex flex-column">
						<a href="#">Strategi</a>
						<a href="#">CSR-politik</a>
						<a href="#">Information om revisionserklæringer</a>
						<a href="#">KOMBITs bestyrelse og ledelse</a>
						<a href="#">KL/KOMBITs digitaliseringsråd</a>
						<a href="#">KL/KOMBITs videncenter</a>
					</div>
				</div>
				<div className="col-3">
					<div className="d-flex flex-column">
						<a href="#">Mød en medarbejder</a>
						<a href="#">Ledige stillinger</a>
						<a href="#">Ny i KOMBIT</a>
						<a href="#">Ledelse i KOMBIT</a>
						<a href="#">Hvorfor arbejde i KOMBIT</a>
					</div>
				</div>
				<div className="col-3">
					<div className="d-flex flex-column">
						<a href="#">Kontakt og support</a>
						<a href="#">Medarbejdere</a>
						<a href="#">Kommunekontakt i KOMBIT</a>
						<a href="#">DPO</a>
						<a href="#">Privatlivspolitik</a>
						<a href="#">Whistleblowerordning</a>
					</div>
				</div>
				<div className="col-3">
					<div className="d-flex flex-column">
						<a href="#">Information for leverandører</a>
						<a href="#">Udbud i KOMBIT</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
