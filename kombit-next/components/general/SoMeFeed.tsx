import { useEffect, useState } from "react";
import styles from "../../styles/Projekt.module.css";


type entry = {};

export default function SoMeFeed() {
	const [slide, setSlide] = useState("linkedin");
	const [linkedin, setLinkedin] = useState([]);
	const [presse, setPresse] = useState([]);
	const [kontakt, setKontakt] = useState([]);

	useEffect(() => {}, []);

	return (
		<div className="row">
			<div
				className={slide == "linkedin" ? "col-4 newsHeader activebox2 news" : "col-4 newsHeader"}
				onClick={() => setSlide("linkedin")}
			>
				<h4>LinkedIn</h4>
			</div>
			<div
				className={slide == "presse" ? "col-4 newsHeader activebox2 news" : "col-4 newsHeader"}
				onClick={() => setSlide("presse")}
			>
				<h4>Presse</h4>
			</div>
			<div
				className={slide == "kontakt" ? "col-4 newsHeader activebox2 news" : "col-4 newsHeader"}
				onClick={() => setSlide("kontakt")}
			>
				<h4>Kontakt</h4>
			</div>
			<div className="col-12">
				<div className="row content-row">
					<div className="col-4 content-column"></div>
					<div className="col-4 content-column"></div>
					<div className="col-4 content-column"></div>
				</div>
			</div>
		</div>
	);
}
